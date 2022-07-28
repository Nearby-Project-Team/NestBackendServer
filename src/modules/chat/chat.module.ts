import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from 'src/common/repository/chatting.repository';

@Module({
  imports: [ 
    TypeORMRepositoryModule.forCustomRepository([
      CaregiverRepository,
      ElderlyRepository,
      ChattingRepository
    ])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
