import { IsAlpha, IsAlphanumeric, IsString } from 'class-validator';

export class CreateCaregiverDTO {
    
    @IsString()
    email: string

    @IsAlpha()
    name: string

    @IsAlphanumeric()
    phone_number: string
    
    password: string

}