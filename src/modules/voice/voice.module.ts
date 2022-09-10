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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TTSConfigModule } from '../../common/configs/TTS/tts.module';
import { TTSConfigService } from '../../common/configs/TTS/tts.config';

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
      imports: [ ConfigModule ],
      useClass: S3Service,
      inject: [ ConfigService ]
    }),
    PassportModule,
    HttpModule.registerAsync({
      imports: [ TTSConfigModule ],
      useClass: TTSConfigService,
      inject: [ TTSConfigService ]
    }),
  ],
  controllers: [VoiceController],
  providers: [
    VoiceService,
    JwtStrategy
  ]
})
export class VoiceModule {}
