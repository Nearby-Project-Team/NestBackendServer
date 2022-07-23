import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginSuccessDto } from './dtos/login-success.dto';
import { RequestError } from '../common/error/ErrorEntity/RequestError';
import { RequestErrorTypeEnum } from 'src/common/error/ErrorType/RequestErrorType.enum';
import { compare } from 'bcrypt';
import { AppError } from '../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';
import { LoginRequestDto } from '../common/dtos/caregiver/login-request.dto';
import { LoginResultDto } from './dtos/login-result.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 } from 'uuid';
import { VerificationEntity } from '../common/entity/verificationLog.entity';
import { baseUrlConfig } from 'src/common/configs/url/url.config';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { VerificationTypeEnum } from 'src/common/dtos/verification/verification.dto';

@Injectable()
export class AuthService {
    constructor (
        private readonly cgRepository: CaregiverRepository,
        @InjectRepository(VerificationEntity)
        private readonly verificationRepository: Repository<VerificationEntity>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService
    ) {}

    async validateCaregiver(email: string, password: string): Promise<LoginSuccessDto> {
        const user = await this.cgRepository.findUserByEmail(email);
        if (user === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const authResult = await compare(password, user.password);
        if (authResult && (user.status === 'Y' || user.status === "A")) {
            const { email, name, phone_number } = user;
            return {
                msg: "Login Success!",
                email,
                name,
                phone_number
            };
        } 
        else if (!authResult) throw new RequestError(RequestErrorTypeEnum.INVALID_PASSWORD);
        else throw new  AppError(AppErrorTypeEnum.USER_NOT_VERIFIED);
    }

    async login(user: LoginRequestDto): Promise<LoginResultDto> {
        const payloadAT = { email: user.email };
        const payloadRT = { };
        return {
            accessToken: this.jwtService.sign(payloadAT),
            refreshToken: this.jwtService.sign(payloadRT)
        }
    }

    async register(user: RegisterDto) {
        const _u = await this.cgRepository.findUserByEmail(user.email);
        if (_u) throw new AppError(AppErrorTypeEnum.USER_EXISTS);

        const newUser = this.cgRepository.create({ ...user, status: "N" }); 
        await this.cgRepository.save(newUser);
        const token = v4();
        const _v = this.verificationRepository.create({
            verification_type: VerificationTypeEnum.register,
            verification_token: token,
            caregiver_id: newUser
        });
        await this.verificationRepository.save(_v);

        const email_base64 = Buffer.from(user.email).toString('base64');
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'NearBy Service Register Email!',
            template: './dist/view/register.ejs',
            context: {
                "authUrl": `${baseUrlConfig()}/auth/verify/${email_base64}/${token}`
            }
        });

        return {
            msg: "Register Success!"
        };
    }

    async verify(email: string, token: string) {
        const _u = await this.cgRepository.findUserByEmail(email);
        if (_u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);

        const _v = await this.verificationRepository.findOne({
            select: [ "verification_type" ],
            where: {
                verification_token: token
            },
            relations: {
                caregiver_id: {
                    uuid: true
                }
            }
        });
        if (_v.caregiver_id !== _u) throw new RequestError(RequestErrorTypeEnum.INVALID_USER);

        switch (_v.verification_type) {
            case VerificationTypeEnum.register:
                await this.cgRepository.update({
                    uuid: _u.uuid
                }, {
                    status: "Y"
                });
                break;
            case VerificationTypeEnum.password:
                break;
        }

        return "Verification Success!";
    }

}
