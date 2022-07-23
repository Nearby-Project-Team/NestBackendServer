import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';
import { Repository } from 'typeorm';
import { CaregiverSeedData } from '../../seedingData/caregiver.seed';
import { ICaregiverEntity } from '../../seedingInterface/ICaregiverEntity';

@Injectable()
export class CaregiverSeederService {
    constructor (
        @InjectRepository(CaregiverEntity)
        private readonly caregiverRepository: Repository<CaregiverEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return CaregiverSeedData.map(async (caregiver: ICaregiverEntity) => {
            try {
                let _u = this.caregiverRepository.create(caregiver);
                await this.caregiverRepository.save(_u);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        });
    }
}