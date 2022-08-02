import { 
  ConnectedSocket,
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
import { ElderlyEntity } from '../../common/entity/elderly.entity';
import { WsException } from '@nestjs/websockets';
import { ElderlyRepository } from '../../common/repository/elderly.repository';


@WebSocketGateway(3030, {
  namespace: 'chat',
  cors: baseUrlConfig()
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor (
    private readonly logger: Logger,
    private readonly chatService: ChatService,
    private readonly chatRoomService: ChatRoomService,
    private readonly elderlyRepository: ElderlyRepository
  ) {}

  @WebSocketServer()
  server: Server;

  async checkValidUser(
    user: CaregiverEntity | ElderlyEntity,
    elderly_id: string
  ) {
    if (user instanceof CaregiverEntity) {
      const _e = await this.elderlyRepository.findElderlyById(elderly_id);
      if (user !== _e.caregiver_id) throw new WsException('Invalid Access! Please Check the Caregiver and Elderly Relation!');
    } else {
      if (user.uuid !== elderly_id) throw new WsException('Invalid Access! Please Check the Caregiver and Elderly Relation!');
    }
  }

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
  async listenForElderlyMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: string
  ) {
    // MicroService의 Chatbot을 연동하여 TTS로 합성된 음성을 내보냄
    const _u = await this.chatService.getUserFromSocket(client); // 사용자 인증을 거침
    if (_u instanceof CaregiverEntity) throw new WsException('Invalid Access! This API is not for Caregiver!');
    await this.chatService.saveChatting(
      data,
      _u.uuid,
      false
    );
    // 1. Chatbot Response를 받음
    const chatbotRes = await this.chatService.getChatbotResponse(data);
    // 2. Chatbot Response를 저장
    await this.chatService.saveChatting(
      chatbotRes.data.response,
      _u.uuid,
      true
    );
    // 3. TTS를 통한 음성 합성

    // 4. Client를 향해 Emit
    client.to(`room:${_u.uuid}`).emit('receive_message', chatbotRes.data.response);
  }

  @SubscribeMessage('send_message_caregiver')
  async listenForCaregiverMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: string
  ) {
    // TTS로 음성을 합성하여 내보냄.
    const _u = await this.chatService.getUserFromSocket(client); // 사용자 인증을 거침
    if (_u instanceof CaregiverEntity) throw new WsException('Invalid Access! This API is not for Elderly!!');
    // 1. TTS를 통한 음성 합성
    
    // 2. Client를 향해 Emit
    client.to(`room:${_u.uuid}`).emit('receive_message');
  }

  @SubscribeMessage('get_chat_room_list') // Caregievr 전용
  async getAllChatRoomList(
    @ConnectedSocket() client: Socket, 
    @MessageBody() email: string
  ) {
    const _u = await this.chatService.getUserFromSocket(client);
    if (_u instanceof ElderlyEntity || _u.email !== email) throw new WsException('Invalid Access!');
    const roomList = await this.chatRoomService.getAllChatRoom(email);
    client.emit('getChatRoomList', roomList);
  }

  @SubscribeMessage('enter_chat_room')
  async enterChatRoom(
    @ConnectedSocket() client: Socket, 
    elderly_id: string
  ) {
    const _u = await this.chatService.getUserFromSocket(client);
    const roomId = `room:${elderly_id}`;
    await this.checkValidUser(_u, elderly_id);

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

  @SubscribeMessage('get_chat_log')
  async getChattingLog(
    @ConnectedSocket() client: Socket, 
    elderly_id: string,
    page: number
  ) {
    const _u = await this.chatService.getUserFromSocket(client);
    await this.checkValidUser(_u, elderly_id);

    const chatList = await this.chatService.getChatting(elderly_id, page);
    return chatList;
  }

}