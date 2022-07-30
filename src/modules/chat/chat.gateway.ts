import { 
  MessageBody,
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { baseUrlConfig } from '../../common/configs/url/url.config';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CaregiverEntity } from '../../common/entity/caregiver.entity';
import { ChatRoomService } from './chatRoom.service';

@WebSocketGateway(3030, {
  namespace: 'chat',
  cors: baseUrlConfig()
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor (
    private readonly logger: Logger,
    private readonly chatService: ChatService,
    private readonly chatRoomService: ChatRoomService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const _u = await this.chatService.getUserFromSocket(client); // 사용자 인증을 거침
    this.logger.log(`Client ID ${client.id} has connected to server!`);
    client.leave(client.id);
    if (_u instanceof CaregiverEntity) {
      client.data.email = _u.email;
      client.data.user_type = "caregiver";
    } else {
      client.data.user_type = "elderly";
    }
    client.data.name = _u.name;
    client.data.roomId = `room:lobby`;
    client.join('room:lobby');
  }

  async handleDisconnect(client: Socket) {
    const { roomId, user_type } = client.data;
    if (
        roomId != 'room:lobby' &&
        !this.server.sockets.adapter.rooms.get(roomId)
    ) {
      if (user_type === "caregiver") {
        this.server.emit(
          'disconnectHandler',
          this.chatRoomService.getAllChatRoom(client.data.email),
        );
      } else {
        this.server.emit(
          'disconnectHandler', {
            msg: "Successfully Exited ChatRoom"
          }
        );
      }
    }
    console.log('disonnected', client.id);
  }

  public afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  } 

  @SubscribeMessage('send_message_elderly')
  listenForElderluMessage(@MessageBody() data: string) {
    // MicroService의 Chatbot을 연동하여 TTS로 합성된 음성을 내보냄
  }

  @SubscribeMessage('send_message_caregiver')
  listenForCaregiverMessage(@MessageBody() data: string) {
    // TTS로 음성을 합성하여 내보냄.
  }

  @SubscribeMessage('get_chat_list') // Caregievr 전용
  async getAllChatRoomList(client: Socket, @MessageBody() email: string) {
    const roomList = await this.chatRoomService.getAllChatRoom(email);
    client.emit('getChatRoomList', roomList);
  }

  @SubscribeMessage('enterChatRoom')
  async enterChatRoom(client: Socket, roomId: string) {
    if (client.rooms.has(roomId)) {
      return;
    }
    this.chatRoomService.enterChatRoom(client, roomId);
    const roomName = await this.chatRoomService.getChatRoom(roomId);
    return {
        roomId: roomId,
        roomName: roomName
    };
  }

}
