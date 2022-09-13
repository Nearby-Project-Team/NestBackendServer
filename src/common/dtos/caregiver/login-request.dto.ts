import { 
    IsString 
} from "class-validator";

export class LoginRequestDto {
    @IsString()
    @IsString()
    public readonly email: string;
    
    @IsString()
    public readonly password: string;
}