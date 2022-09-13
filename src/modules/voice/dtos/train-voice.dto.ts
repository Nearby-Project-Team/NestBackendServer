import { IsString } from "class-validator";

export class TrainVoiceDto {

    @IsString()
    email: string;

    @IsString()
    vname: string;

}

export class TrainCompleteDto {

    @IsString() // Test IsString
    email: string;

    @IsString()
    voice_target: string;

}