import { IsString } from 'class-validator';

export class ChatRoomDto {

    @IsString()
    readonly chatRoomId: string;

    @IsString()
    readonly chatRoomName: string;

}