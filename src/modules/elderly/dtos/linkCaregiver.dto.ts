import { IsString, IsUUID } from "class-validator";

export class LinkCaregiverDto {
    
    @IsString() 
    email: string;

    @IsUUID()
    elderly_id: string;

}