import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VerificationEntity } from '../../../common/entity/verificationLog.entity';
import { Repository } from 'typeorm';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';
import { VerificationSeedData } from '../../seedingData/verificationLog.seed';
import { IVerificationLogEntity } from "src/seeds/seedingInterface/IVerificationLogEntity";
import { CaregiverSeedData } from '../../seedingData/caregiver.seed';

@Injectable()
export class VerificationLogSeederService {
    constructor (
        @InjectRepository(VerificationEntity)
        private readonly verificationRepository: Repository<VerificationEntity>,
        @InjectRepository(CaregiverEntity)
        private readonly cgRepository: Repository<CaregiverEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return VerificationSeedData.map(async (logData: IVerificationLogEntity, index: number) => {
            try {   
                let _u = await this.cgRepository.findOne({ where: { email: CaregiverSeedData[index].email } });
                if (!_u) { 
                    console.log('No Such Caregiver!!');
                    return false;
                }
                const _v = this.verificationRepository.create({ ...logData, caregiver_id: _u });
                await this.verificationRepository.save(_v);
                return true;
            } catch(err) {  
                console.log(err);
                return false;
            }
        });
    }

}