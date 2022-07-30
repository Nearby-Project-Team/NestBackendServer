import { UserTypeEnum } from 'src/common/types/user.type';
import { IsEmail, IsString } from 'class-validator';

export class CaregiverTokenPayloadDto {

    @IsEmail()
    public readonly email: string;
    
    @IsString()
    public readonly status: UserTypeEnum;
    
}