import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginSuccessDto } from './dtos/login-success.dto';
import { RequestError } from '../common/error/ErrorEntity/RequestError';
import { RequestErrorTypeEnum } from 'src/common/error/ErrorType/RequestErrorType.enum';
import { compare, genSalt, hash } from 'bcrypt';
import { AppError } from '../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';
import { LoginRequestDto } from '../common/dtos/caregiver/login-request.dto';
import { LoginResultDto } from './dtos/login-result.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { VerificationEntity } from '../common/entity/verificationLog.entity';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { VerificationTypeEnum } from 'src/common/dtos/verification/verification.dto';
import { CaregiverTokenPayloadDto } from './dtos/token-payload.dto';
import { UserTypeEnum } from 'src/common/types/user.type';

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

    async validateJwtToken(token: string) {
        const payload: CaregiverTokenPayloadDto = this.jwtService.verify(token);
        
    }

    async login(user: LoginRequestDto): Promise<LoginResultDto> {
        const payloadAT: CaregiverTokenPayloadDto = { 
            email: user.email,
            status: UserTypeEnum.CAREGIVER
        };
        return {
            accessToken: this.jwtService.sign(payloadAT)
        }
    }

    async register(user: RegisterDto) {
        const _u = await this.cgRepository.findUserByEmail(user.email);
        if (_u) throw new AppError(AppErrorTypeEnum.USER_EXISTS);

        const refreshToken = randomBytes(20).toString('hex');
        const newUser = this.cgRepository.create({ 
            ...user, 
            token: refreshToken,
            status: "N", 
            agreement: "N" 
        }); 
        await this.cgRepository.save(newUser);
        const token = randomBytes(20).toString('hex');
        const _v = this.verificationRepository.create({
            verification_type: VerificationTypeEnum.register,
            verification_token: token,
            caregiver_id: newUser
        });
        await this.verificationRepository.save(_v);
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'NearBy Service Register Email',
            template: './dist/view/register.ejs',
            context: {
                "authToken": `${token}`
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
                verification_token: token,
                caregiver_id: {
                    uuid: _u.uuid
                }
            },
            relations: {
                caregiver_id: {
                    uuid: true
                }
            }
        });
        if (_v === null) throw new RequestError(RequestErrorTypeEnum.INVALID_USER);

        let refreshToken = null;
        switch (_v.verification_type) {
            case VerificationTypeEnum.register:
                await this.cgRepository.update({
                    uuid: _u.uuid
                }, {
                    status: "Y"
                });

                refreshToken = _u.token;
                const salt = await genSalt();
                const newToken = await hash(refreshToken, salt);
                await this.cgRepository.update({
                    uuid: _u.uuid
                }, {
                    token: newToken
                });
                break;
            case VerificationTypeEnum.password:
                break;
        }

        return { 
            msg: "Verification Success!",
            token: refreshToken
        };
    }

    async agreement(email: string) {
        const _u = await this.cgRepository.findUserByEmail(email);
        if (_u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);

        await this.cgRepository.update({
            uuid: _u.uuid
        }, {
            agreement: "Y"
        });

        return "Successfully get agreement!";
    }

    async reAssignToken(token: string, email: string) {
        const cg_emial = Buffer.from(email, 'base64').toString('utf-8');
        const _u = await this.cgRepository.findUserByEmail(cg_emial);
        if (_u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);

        const result = compare(token, _u.token);
        if (result) {
            const payload: CaregiverTokenPayloadDto = {
                email: cg_emial,
                status: UserTypeEnum.CAREGIVER
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                accessToken: accessToken
            };
        }
        else throw new AppError(AppErrorTypeEnum.INVALID_VERIFICATION);
    }

}
