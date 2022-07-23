import { IsEmail, IsString, IsUUID } from 'class-validator';

export class VoiceMetadataDto {

    @IsUUID()
    unique_id: string;

    @IsString()
    size: string;

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

}