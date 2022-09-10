import { ScheduleTypeEnum } from 'src/common/types/schedule.type';

export interface ICalendarEntity {
    contents: string;
    ScheduleDate: string;
    notificationType: ScheduleTypeEnum;
}