import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CalendarEntity } from '../../../common/entity/calendar.entity';
import { Repository } from 'typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { CalandarSeedData } from '../../seedingData/calendar.seed';
import { ICalendarEntity } from '../../../seeds/seedingInterface/ICalendarEntity';
import { ElderlySeedData } from '../../seedingData/elderly.seed';

@Injectable()
export class CalendarSeederService {
    constructor (
        @InjectRepository(CalendarEntity)
        private readonly calendarRepository: Repository<CalendarEntity>,
        @InjectRepository(ElderlyEntity)
        private readonly elderlyRepository: Repository<ElderlyEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return CalandarSeedData.map(async (calandarData: ICalendarEntity, index: number) => {
            try {
                let _e = await this.elderlyRepository.findOne({ where: { name: ElderlySeedData[index].name } });
                if (!_e) {
                    console.log('No Such Elderly!!');
                    return false;
                }
                const _c = this.calendarRepository.create({ ...calandarData, elderly_id: _e });
                await this.calendarRepository.save(_c);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        });
    }

}