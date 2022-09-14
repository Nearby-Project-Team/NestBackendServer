import { UserTypeEnum } from 'src/common/types/user.type';
import { IsString } from 'class-validator';

export class CaregiverTokenPayloadDto {

    @IsString()
    public readonly email: string;
    
    @IsString()
    public readonly status: UserTypeEnum;
    
}