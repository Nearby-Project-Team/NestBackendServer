import { Injectable } from '@nestjs/common';
import { RequestError } from 'src/common/error/ErrorEntity/RequestError';
import { RequestErrorTypeEnum } from 'src/common/error/ErrorType/RequestErrorType.enum';
import { CalendarRepository } from 'src/common/repository/calendar.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ScheduleTypeEnum } from 'src/common/types/schedule.type';
import { OneOFFScheduleDto } from './dto/ooschedule.dto';
import { RepeatScheduleDto } from './dto/reschedule.dto';

@Injectable()
export class CalendarService {

    constructor(
        private readonly calendarRepository: CalendarRepository,
        private readonly elderlyRepository: ElderlyRepository
    ) {}

    async setOneOffScheduleElderly(schedule_info: OneOFFScheduleDto) {
        const _e = await this.elderlyRepository.findElderlyById(schedule_info.elderly_id);
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const _s = this.calendarRepository.create({
            elderly_id: _e,
            ScheduleDate: schedule_info.date,
            contents: schedule_info.content,
            notificationType: ScheduleTypeEnum.ONEOFF
        });
        await this.calendarRepository.save(_s);
        return {
            msg: "Successfully Registered Schedule!"
        };
    }

    async setRepeatScheduleElderly(schedule_info: RepeatScheduleDto) {
        const _e = await this.elderlyRepository.findElderlyById(schedule_info.elderly_id);
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const _s = this.calendarRepository.create({
            elderly_id: _e,
            ScheduleDate: schedule_info.date,
            contents: schedule_info.content,
            notificationType: ScheduleTypeEnum.REPEATATION
        });
        await this.calendarRepository.save(_s);
        return {
            msg: "Successfully Registered Schedule!"
        };
    }

}
