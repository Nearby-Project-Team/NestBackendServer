import { IsEmail, IsString, IsUUID } from "class-validator";

export class TrainVoiceDto {

    @IsEmail()
    email: string;

    @IsString()
    vname: string;

}

export class TrainCompleteDto {

    @IsEmail() // Test IsEmail
    email: string;

    @IsString()
    voice_target: string;

}