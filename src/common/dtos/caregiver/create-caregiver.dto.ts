import { IsAlpha, IsAlphanumeric, IsEmail } from 'class-validator';

export class CreateCaregiverDTO {
    
    @IsEmail()
    email: string

    @IsAlpha()
    name: string

    @IsAlphanumeric()
    phone_number: string
    
    password: string

}