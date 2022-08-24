import { IsDateString, IsString, IsUUID } from "class-validator";

export class OneOFFScheduleDto {

    @IsUUID()
    elderly_id: string;

    @IsDateString()
    date: string;

    @IsString()
    content: string;

}