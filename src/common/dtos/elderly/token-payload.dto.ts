import { IsString } from 'class-validator';
import { UserTypeEnum } from 'src/common/types/user.type';

export class ElderlyTokenPayloadDto {
    
    @IsString()
    public readonly elderly_id: string;

    @IsString()
    public readonly status: UserTypeEnum;

}