import { 
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
import { ChattingRepository } from '../../common/repository/chatting.repository';

@WebSocketGateway(3030, {
  namespace: 'chat',
  cors: baseUrlConfig()
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor (
    private readonly logger: Logger
  ) {}

  @WebSocketServer()
  server: Server;

  public handleConnection(client: Socket, ...args: any[]) {
    
  }

  public handleDisconnect(client: Socket) {

  }

  public afterInit() {
    this.logger.debug(`Socket Server Init Complete`);
  } 



}
