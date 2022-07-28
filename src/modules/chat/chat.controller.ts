import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Elderly가 Chatting을 보냄 => 음성을 반환해줌
  @Get('/send') 
  async send2Chatbot(

  ) {

  }

  // DB에서 Chatting 데이터를 가져옴.
  @Get('/history/:euuid')
  async getChatHistory(
    @Param('euuid') elderly_uuid: string,
    @Query('page') page: number
  ) {
    
  }

  // caregiver가 elderly에게 message를 보내냄 => 음성 합성해서 반환해야함.
  @Post('/cgsend')
  async sendMsgfromCG(

  ) {

  }

}
