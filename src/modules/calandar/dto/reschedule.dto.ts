import { IsString, IsUUID } from "class-validator";

export class RepeatScheduleDto {

    @IsUUID()
    elderly_id: string;

    @IsString()
    date: string;

    @IsString()
    content: string;

}