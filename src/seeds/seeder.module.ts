import { Module, Logger } from '@nestjs/common';
import { Seeder } from './seeder.service';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';
import { CaregiverSeederModule } from './seedService/Caregiver/caregiver.module';
import { ElderlySeederModule } from './seedService/Elderly/elderly.module';

@Module({
    imports: [
        MySQLDBProviderModule,
        CaregiverSeederModule,
        ElderlySeederModule
    ],
    providers: [ 
        Logger, 
        Seeder 
    ]
})
export class SeederModule {}