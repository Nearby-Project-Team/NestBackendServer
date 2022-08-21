import { ICalandarEntity } from '../seedingInterface/ICalandarEntity';
import { faker } from '@faker-js/faker';

export const CalandarSeedData: ICalandarEntity[] = [
    {
        contents: 'Medicine',
        ScheduleDate: "* * * */7 * *",
        notificationType: "Repeatation"
    },
    {
        contents: 'Go to walk',
        ScheduleDate: "2022-07-30 21:00",
        notificationType: "one-time"
    }
];