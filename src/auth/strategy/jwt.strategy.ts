import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constant';
import { CaregiverTokenPayloadDto } from '../../common/dtos/caregiver/token-payload.dto';
import { ElderlyTokenPayloadDto } from '../../common/dtos/elderly/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.accessToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: CaregiverTokenPayloadDto | ElderlyTokenPayloadDto) {
        return payload;
    }
}