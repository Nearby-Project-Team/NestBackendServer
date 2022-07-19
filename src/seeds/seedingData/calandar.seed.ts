import { ICalandarEntity } from '../seedingInterface/ICalandarEntity';
import { faker } from '@faker-js/faker';

export const CalandarSeedData: ICalandarEntity[] = [
    {
        contents: faker.random.words(5),
        ScheduleDate: "* * * */7 * *",
        notificationType: "Repeatation"
    },
    {
        contents: faker.random.words(7),
        ScheduleDate: "2022-07-30 21:00",
        notificationType: "one-time"
    }
];