import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaregiverEntity } from 'src/common/entity/caregiver.entity';
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

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(CaregiverEntity) 
        private readonly cgRepository: Repository<CaregiverEntity>,
        private readonly jwtService: JwtService
    ) {}

    async validateCaregiver(email: string, password: string): Promise<LoginSuccessDto> {
        const user = await this.cgRepository.findOne({
            select: [ 'uuid', 'email', 'password', 'name', 'status', 'phone_number' ],
            where: {
                email: email
            }
        });
        if (!user) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
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
        const _u = await this.cgRepository.findOne({
            select: [ "uuid" ],
            where: {
                email: user.email
            }
        });
        if (_u) throw new AppError(AppErrorTypeEnum.USER_EXISTS);

        const newUser = this.cgRepository.create({ ...user, status: "N" }); 
        await this.cgRepository.save(newUser);

        return {
            msg: "Register Success!"
        };
    }

}
