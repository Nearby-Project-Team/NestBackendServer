import { Module } from '@nestjs/common';
import { CaregiverSeederModule } from './Caregiver/caregiver.module';
import { ElderlySeederModule } from './Elderly/elderly.module';

@Module({
    imports: [ 
        CaregiverSeederModule,
        ElderlySeederModule
    ]
})
export class DataSeederModule {}