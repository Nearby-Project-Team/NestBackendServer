import { Module, Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from 'src/common/repository/chatting.repository';
import { ChatRoomService } from './chatRoom.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceModelEntity } from '../../common/entity/voiceModel.entity';
import { VoiceModelRepository } from '../../common/repository/voiceModel.repository';

@Module({
  imports: [ 
    TypeORMRepositoryModule.forCustomRepository([
      CaregiverRepository,
      ElderlyRepository,
      ChattingRepository,
      VoiceModelRepository
    ]),
    ConfigModule,
    HttpModule,
    AuthModule
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    ChatRoomService,
    Logger
  ]
})
export class ChatModule {}
