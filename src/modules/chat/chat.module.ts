import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from 'src/common/repository/chatting.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ChatGateway } from './chat.gateway';
import { ChatRoomService } from './chatRoom.service';

@Module({
  imports: [ 
    TypeORMRepositoryModule.forCustomRepository([
      CaregiverRepository,
      ElderlyRepository,
      ChattingRepository
    ]),
    PassportModule
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    JwtStrategy,
    ChatGateway,
    ChatRoomService
  ]
})
export class ChatModule {}
