import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';
import { VerificationEntity } from '../../../common/entity/verificationLog.entity';
import { VerificationLogSeederService } from './verification.seed';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CaregiverEntity,
            VerificationEntity
        ]),
    ],
    providers: [ VerificationLogSeederService ],
    exports: [ VerificationLogSeederService ]
})
export class VerificationLogSeederModule {}