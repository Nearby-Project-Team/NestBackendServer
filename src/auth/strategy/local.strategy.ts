import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginSuccessDto } from '../dtos/login-success.dto';
import { AuthService } from '../auth.service';
import { AppError } from '../../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate(email: string, password: string): Promise<LoginSuccessDto> {
        const u = await this.authService.validateCaregiver(email, password);
        if (!u) throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        return u;
    }
}