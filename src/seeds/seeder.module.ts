import { Module, Logger } from '@nestjs/common';
import { Seeder } from './seeder.service';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';
import { CaregiverSeederModule } from './seedService/Caregiver/caregiver.module';
import { ElderlySeederModule } from './seedService/Elderly/elderly.module';
import { CalandarSeederModule } from './seedService/Calandar/calandar.module';
import { ChattingSeederModule } from './seedService/Chatting/chatting.module';
import { VerificationLogSeederModule } from './seedService/VerificationLog/verification.module';

@Module({
    imports: [
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