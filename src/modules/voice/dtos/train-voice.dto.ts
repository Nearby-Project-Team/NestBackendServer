import { IsEmail, IsString } from "class-validator";

export class TrainVoiceDto {

    @IsEmail()
    email: string;

    @IsString()
    vname: string;

}