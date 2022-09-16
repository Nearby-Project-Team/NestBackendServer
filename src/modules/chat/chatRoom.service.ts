import { Injectable } from "@nestjs/common";
import { ElderlyRepository } from '../../common/repository/elderly.repository';
import { Socket } from 'socket.io';
import { ChatRoomDto } from './dtos/chatRoom.dto';
import { WsException } from "@nestjs/websockets";
import { WebSocketErrorTypeEnum } from "src/common/error/ErrorType/WebSocketErrorType.enum";

@Injectable()
export class ChatRoomService {
    
    constructor (
        private readonly elderlyRepository: ElderlyRepository
    ) {}

    async enterChatRoom(client: Socket, roomId: string) {
        client.data.roomId = roomId;
        client.rooms.clear();
        client.join(roomId);
        client.to(roomId).emit('client_connect', `${client.data.name} 님이 입장하셨습니다.`);
    }

    exitChatRoom(client: Socket, roomId: string) { 
        client.data.roomId = `room:lobby`;
        client.rooms.clear();
        client.join(`room:lobby`);
        client.to(roomId).emit('client_disconnect', `${client.data.name} 님이 퇴장하셨습니다.`);
    }

    async getChatRoom(elderly_id: string): Promise<ChatRoomDto> {
        const _e = await this.elderlyRepository.findElderlyById(elderly_id);
        if (_e === null) throw new WsException(WebSocketErrorTypeEnum.NO_VALID_USER);
        return {
            chatRoomId: `room:${_e.uuid}`,
            chatRoomName: `${_e.name}'s Room`
        };
    }

    async getAllChatRoom(email: string) { // Caregiver 전용 함수
        const [elderlyList, _] = await this.elderlyRepository.findAllElderlyCaregiver(email);
        const roomList: ChatRoomDto[] = elderlyList.map((elderly): ChatRoomDto => {
            return {
                chatRoomId: `room:${elderly.uuid}`,
                chatRoomName: `${elderly.name}'s Room`
            };
        });
        return roomList;
    }

}