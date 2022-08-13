import { IsEmail, IsString, IsUUID } from "class-validator";

export class TrainVoiceDto {

    @IsEmail()
    email: string;

    @IsString()
    vname: string;

}

export class TrainCompleteDto {

    @IsUUID()
    caregiver_id: string;

    @IsString()
    voice_path: string;

}