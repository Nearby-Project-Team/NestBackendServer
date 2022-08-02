import { IsString, IsDateString } from 'class-validator';

export class ElderlySearchDto {
    @IsString()
    name: string;

    @IsDateString()
    birthdate: Date;

    @IsString()
    phone_number?: string;
}