import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Elderly가 Chatting을 보냄 => 음성을 반환해줌
  @Get('send') 
  async send(

  ) {

  }

}
