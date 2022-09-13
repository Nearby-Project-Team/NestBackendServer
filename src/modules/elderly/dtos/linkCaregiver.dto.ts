import { IsString, IsUUID } from "class-validator";

export class LinkCaregiverDto {
    
    @IsString() 
    cg_email: string;

    @IsUUID()
    elderly_id: string;

}