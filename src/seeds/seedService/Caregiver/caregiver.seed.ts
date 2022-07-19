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

    createCaregiverEntity(caregiver: ICaregiverEntity) {
        let _u = new CaregiverEntity();
        _u.email = caregiver.email;
        _u.name = caregiver.name;
        _u.password = caregiver.password;
        _u.phone_number = caregiver.phone_number;
        _u.status = caregiver.status;
        return _u;
    }

    create(): Array<Promise<boolean>> {
        return CaregiverSeedData.map(async (caregiver: ICaregiverEntity) => {
            try {
                let _u = this.createCaregiverEntity(caregiver);
                await this.caregiverRepository.save(_u);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        });
    }
}