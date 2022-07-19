import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';
import { ElderlySeederService } from './elderly.seed';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ 
            ElderlyEntity,
            CaregiverEntity
        ]) 
    ],
    providers: [ ElderlySeederService ],
    exports: [ ElderlySeederService ]
})
export class ElderlySeederModule {}