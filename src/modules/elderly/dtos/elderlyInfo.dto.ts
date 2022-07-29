import { IsDateString, IsString, IsEmail } from "class-validator";
import { AgreementEnum } from "src/common/types/agreement.type";

export class ElderlyInfoDto {

    @IsEmail() 
    cg_email: string;

    @IsString()
    name: string;

    @IsDateString()
    birthdate: Date;

    @IsString()
    phone_number: string;

    @IsString()
    agreement: AgreementEnum;

}