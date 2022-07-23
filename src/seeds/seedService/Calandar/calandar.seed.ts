import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CalandarEntity } from '../../../common/entity/calandar.entity';
import { Repository } from 'typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { CalandarSeedData } from '../../seedingData/calandar.seed';
import { ICalandarEntity } from '../../../../dist/seeds/seedingInterface/ICalandarEntity';
import { ElderlySeedData } from '../../seedingData/elderly.seed';
import { AppError } from '../../../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';

@Injectable()
export class CalandarSeederService {
    constructor (
        @InjectRepository(CalandarEntity)
        private readonly calandarRepository: Repository<CalandarEntity>,
        @InjectRepository(ElderlyEntity)
        private readonly elderlyRepository: Repository<ElderlyEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return CalandarSeedData.map(async (calandarData: ICalandarEntity, index: number) => {
            try {
                let _e = await this.elderlyRepository.findOne({ where: { name: ElderlySeedData[index].name } });
                if (!_e) {
                    console.log('No Such Elderly!!');
                    return false;
                }
                const _c = this.calandarRepository.create({ ...calandarData, elderly_id: _e });
                await this.calandarRepository.save(_c);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        });
    }

}