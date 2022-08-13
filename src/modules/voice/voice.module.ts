import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMRepositoryModule } from '../../common/repository/typeorm.repository';
import { CaregiverRepository } from '../../common/repository/caregiver.repository';
import { VoiceFileEntity } from '../../common/entity/voiceFile.entity';
import { VoiceModelRelationEntity } from '../../common/entity/voiceRelation.entity';
import { VoiceModelEntity } from '../../common/entity/voiceModel.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from '../../providers/multer/s3.service';
import { AWSProviderModule } from '../../providers/aws/aws.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ElderlyRepository } from '../../common/repository/elderly.repository';
import { HttpModule } from '@nestjs/axios';
import { ChatbotConfigModule } from '../../common/configs/chatbot/chatbot.module';
import { ChatbotConfigService } from '../../common/configs/chatbot/chatbot.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VoiceFileEntity,
      VoiceModelEntity,
      VoiceModelRelationEntity
    ]),
    TypeORMRepositoryModule.forCustomRepository([
      CaregiverRepository,
      ElderlyRepository
    ]),
    AWSProviderModule,
    MulterModule.registerAsync({
      useClass: S3Service
    }),
    PassportModule,
    HttpModule.registerAsync({
      imports: [ ChatbotConfigModule ],
      useClass: ChatbotConfigService,
      inject: [ ChatbotConfigService ]
    }),
  ],
  controllers: [VoiceController],
  providers: [
    VoiceService,
    JwtStrategy
  ]
})
export class VoiceModule {}
