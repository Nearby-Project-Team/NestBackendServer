import { Module, Logger } from '@nestjs/common';
import { Seeder } from './seeder.service';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';
import { CaregiverSeederModule } from './seedService/Caregiver/caregiver.module';
import { ElderlySeederModule } from './seedService/Elderly/elderly.module';
import { CalandarSeederModule } from './seedService/Calendar/calendar.module';
import { ChattingSeederModule } from './seedService/Chatting/chatting.module';
import { VerificationLogSeederModule } from './seedService/VerificationLog/verification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: (process.env.NODE_ENV === 'production') ? './env/.production.env'
            : (process.env.NODE_ENV === 'stage') ? './env/.stage.env' : './env/.development.env'
        }),
        MySQLDBProviderModule,
        CaregiverSeederModule,
        ElderlySeederModule,
        CalandarSeederModule,
        ChattingSeederModule,
        VerificationLogSeederModule
    ],
    providers: [ 
        Logger, 
        Seeder 
    ]
})
export class SeederModule {}