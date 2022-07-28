import { IsDateString, IsString } from "class-validator";
import { AgreementEnum } from "src/common/types/agreement.type";

export class ElderlyInfoDto {

    @IsString()
    name: string;

    @IsDateString()
    birthdate: string;

    @IsString()
    phone_number: string;

    @IsString()
    agreement: AgreementEnum;

}