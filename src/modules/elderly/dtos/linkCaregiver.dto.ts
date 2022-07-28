import { IsEmail, IsString, IsUUID } from "class-validator";

export class LinkCaregiverDto {
    
    @IsEmail() 
    cg_email: string;

    @IsUUID()
    elderly_id: string;

}