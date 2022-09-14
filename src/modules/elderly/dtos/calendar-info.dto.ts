import { ScheduleTypeEnum } from 'src/common/types/schedule.type';

export class CalendarInfoDto {

    content: string;

    scheduleDate: string;

    notificationType: ScheduleTypeEnum;

    createdAt: Date;

}