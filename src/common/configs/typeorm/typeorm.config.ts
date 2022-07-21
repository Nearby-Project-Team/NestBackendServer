import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { CaregiverEntity } from '../../entity/caregiver.entity';
import { ElderlyEntity } from '../../entity/elderly.entity';
import { ChattingEntity } from '../../entity/chatting.entity';
import { CalandarEntity } from '../../entity/calandar.entity';
import { VerificationEntity } from '../../entity/verificationLog.entity';
import { VoiceFileEntity } from '../../entity/voiceFile.entity';
import { VoiceModelEntity } from '../../entity/voiceModel.entity';

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            port: +this.configService.get<number>('DATABASE_PORT'),
            host: this.configService.get<string>('DATABASE_HOST'),
            database: this.configService.get<string>('DATABASE_NAME'),
            entities: [ 
                CaregiverEntity,
                ElderlyEntity,
                ChattingEntity,
                CalandarEntity,
                VerificationEntity,
                VoiceFileEntity,
                VoiceModelEntity
            ],
            synchronize: process.env.NODE_ENV === 'development' ? true : false
        }
    }
}