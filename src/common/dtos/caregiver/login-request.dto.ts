import { 
    IsEmail, 
    IsString 
} from "class-validator";

export class LoginRequestDto {
    @IsString()
    @IsEmail()
    public readonly email: string;
    
    @IsString()
    public readonly password: string;
}