import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyEntity } from '../../common/entity/elderly.entity';
import { CaregiverEntity } from '../../common/entity/caregiver.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ 
      ElderlyEntity,
      CaregiverEntity 
    ])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
