import { Module } from '@nestjs/common';
import { CaregiverSeederModule } from './Caregiver/caregiver.module';
import { ElderlySeederModule } from './Elderly/elderly.module';
import { CaregiverSeederService } from './Caregiver/caregiver.seed';
import { ElderlySeederService } from './Elderly/elderly.seed';

@Module({
    imports: [ 
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