import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';
import { CaregiverSeederService } from './caregiver.seed';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ 
            CaregiverEntity 
        ]) 
    ],
    providers: [ CaregiverSeederService ],
    exports: [ CaregiverSeederService ]
})
export class CaregiverSeederModule {}