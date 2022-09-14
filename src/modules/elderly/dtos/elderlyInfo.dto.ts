import { IsDateString, IsString, IsUUID } from "class-validator";
import { AgreementEnum } from "src/common/types/agreement.type";

export class ElderlyInfoDto {

    @IsUUID()
    elderly_id: string;

    @IsString() 
    email: string;

    @IsString()
    name: string;

    @IsDateString()
    birthdate: Date;

    @IsString()
    phone_number?: string;

    @IsString()
    agreement: AgreementEnum;

}