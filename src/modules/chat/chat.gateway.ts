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
import { Server, Socket } from 'socket.io';
import { Logger, UseFilters } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CaregiverEntity } from '../../common/entity/caregiver.entity';
import { ChatRoomService } from './chatRoom.service';
import { ElderlyEntity } from '../../common/entity/elderly.entity';
import { WsException } from '@nestjs/websockets';
import { ElderlyRepository } from '../../common/repository/elderly.repository';
import { WebSocketErrorTypeEnum } from 'src/common/error/ErrorType/WebSocketErrorType.enum';
import { WebSocketExceptionDispatcher } from 'src/common/exceptions/websocket.exception';


@WebSocketGateway(9091, {
  namespace: 'chat',
  transports: ['websocket']
})
@UseFilters(WebSocketExceptionDispatcher)
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
      const _e = await this.elderlyRepository.checkElderlyLinkedCargiver(elderly_id, user.email);
      if (!_e) throw new WsException(WebSocketErrorTypeEnum.INVALID_USER);
    } else if (user instanceof ElderlyEntity){
      if (user.uuid !== elderly_id) throw new WsException(WebSocketErrorTypeEnum.INVALID_USER);
    } else {
      throw new WsException(WebSocketErrorTypeEnum.INVALID_USER);
    }
    this.logger.debug('Validation Success!');
  }

  async handleConnection(client: Socket) {
    const _u = await this.chatService.getUserFromSocket(client); // 사용자 인증을 거침
    this.logger.debug(`Client ID ${client.id} has connected to server!`);
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
    if (roomId != 'room:lobby') {
      this.chatRoomService.exitChatRoom(client, roomId);
      if (user_type === "caregiver") {
        this.server.emit(
          'disconnect_handler',
          this.chatRoomService.getAllChatRoom(client.data.email),
        );
      } else {
        this.server.to(roomId).emit(
          'disconnect_handler', {
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
    this.logger.debug(data);
    const _u = await this.chatService.getUserFromSocket(client); // 사용자 인증을 거침
    if (_u instanceof CaregiverEntity) throw new WsException('Invalid Access! This API is not for Caregiver!');
    await this.chatService.saveChatting(
      data,
      _u.uuid,
      false
    );
    const chatbotRes = await this.chatService.getChatbotResponse(data, _u.uuid);
    await this.chatService.saveChatting(
      chatbotRes.data.response,
      _u.uuid,
      true
    );
    // 3. TTS를 통한 음성 합성

    // 4. Client를 향해 Emit
    this.server.to(`room:${_u.uuid}`).emit('receive_message', chatbotRes.data.response);
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
    this.server.to(`room:${_u.uuid}`).emit('receive_message');
  }

  @SubscribeMessage('get_chat_room_list') // Caregievr 전용
  async getAllChatRoomList(
    @ConnectedSocket() client: Socket, 
    @MessageBody() email: string
  ) {
    const _u = await this.chatService.getUserFromSocket(client);
    if (_u instanceof ElderlyEntity || _u.email !== email) throw new WsException('Invalid Access!');
    const roomList = await this.chatRoomService.getAllChatRoom(email);
    client.emit('get_chat_room_list', roomList);
  }

  @SubscribeMessage('enter_chat_room')
  async enterChatRoom(
    @ConnectedSocket() client: Socket, 
    @MessageBody() elderly_id: string
  ) {
    const _u = await this.chatService.getUserFromSocket(client);
    const roomId = `room:${elderly_id}`;
    const _e = await this.elderlyRepository.findElderlyById(elderly_id);
    this.logger.debug(`${_u.uuid} ${_e.uuid}`);
    await this.checkValidUser(_u, _e.uuid);

    if (client.rooms.has(roomId)) {
      this.logger.error('Client Already In the Room!');
      return;
    }
    this.chatRoomService.enterChatRoom(client, roomId);
    const roomName = await this.chatRoomService.getChatRoom(elderly_id);
    client.emit('enter_chat_room', {
        roomId: roomId,
        roomName: roomName
    });
  }

  @SubscribeMessage('get_chat_log')
  async getChattingLog(
    @ConnectedSocket() client: Socket, 
    @MessageBody('elderly_id') elderly_id: string,
    @MessageBody('page') page: number
  ) {
    this.logger.debug(`${elderly_id} ${page}`);
    const _u = await this.chatService.getUserFromSocket(client);
    await this.checkValidUser(_u, elderly_id);

    const [chatList, _] = await this.chatService.getChatting(elderly_id, page);
    this.logger.debug(JSON.stringify(chatList));
    client.emit('get_chat_log', {
      data: chatList
    });
  }

}
