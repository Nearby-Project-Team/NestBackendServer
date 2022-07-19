import { Module } from '@nestjs/common';
import { CaregiverSeederModule } from './Caregiver/caregiver.module';
import { ElderlySeederModule } from './Elderly/elderly.module';
import { CaregiverSeederService } from './Caregiver/caregiver.seed';
import { ElderlySeederService } from './Elderly/elderly.seed';
import { MySQLDBProviderModule } from '../../providers/database/mysql/mysql.module';

@Module({
    imports: [ 
        MySQLDBProviderModule,
        CaregiverSeederModule,
        ElderlySeederModule
    ],
    providers: [
        CaregiverSeederService,
        ElderlySeederService
    ],
    exports: [
        CaregiverSeederService,
        ElderlySeederService
    ]
})
export class DataSeederModule {}