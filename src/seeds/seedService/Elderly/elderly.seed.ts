import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { Repository } from 'typeorm';
import { ElderlySeedData } from '../../seedingData/elderly.seed';
import { IElderlyEntity } from '../../seedingInterface/IElderlyEntity';
import { CaregiverSeedData } from '../../seedingData/caregiver.seed';
import { CaregiverEntity } from '../../../common/entity/caregiver.entity';

@Injectable()
export class ElderlySeederService {
    constructor (
        @InjectRepository(ElderlyEntity)
        private readonly elderlyRepository: Repository<ElderlyEntity>,
        @InjectRepository(CaregiverEntity)
        private readonly caregiverRepository: Repository<CaregiverEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return ElderlySeedData.map(async (elderly: IElderlyEntity, index: number) => {
            try {
                let _u = await this.caregiverRepository.findOne({ where: { email: CaregiverSeedData[index].email } });
                if (!_u) { 
                    console.log('No Such Caregiver!!');
                    return false;
                }
                const _e = this.elderlyRepository.create({ ...elderly, caregiver_id: _u });
                await this.elderlyRepository.save(_e);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        })   
    }
}