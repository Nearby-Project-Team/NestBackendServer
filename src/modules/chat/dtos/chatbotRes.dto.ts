import { IsString } from "class-validator";

export class ChatbotResponseDto {

    @IsString()
    response: string;

}