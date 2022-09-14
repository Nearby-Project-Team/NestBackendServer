import { ICalendarEntity } from '../seedingInterface/ICalendarEntity';
import { ScheduleTypeEnum } from 'src/common/types/schedule.type';

export const CalandarSeedData: ICalendarEntity[] = [
    {
        contents: 'Medicine',
        ScheduleDate: "* * * */7 * *",
        notificationType: ScheduleTypeEnum.REPEATATION
    },
    {
        contents: 'Go to walk',
        ScheduleDate: "2022-07-30 21:00",
        notificationType: ScheduleTypeEnum.ONEOFF
    }
];