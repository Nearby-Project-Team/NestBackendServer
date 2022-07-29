import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { baseUrlConfig } from 'src/common/configs/url/url.config';

@WebSocketGateway(3030, { 
  namespace: 'nearby',
  cors: baseUrlConfig()
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  public handleConnection(client: any, ...args: any[]) {
      
  }

  public handleDisconnect(client: any) {
      
  }

  public afterInit(server: any) {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }



}