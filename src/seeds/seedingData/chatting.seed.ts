import { IChattingEntity } from '../seedingInterface/IChattingEntity';
import { faker } from '@faker-js/faker';

export const ChattingSeedData: IChattingEntity[] = [
    {
        contents: faker.random.words(5),
        sender: true
    },
    {
        contents: faker.random.words(10),
        sender: false
    },
    {
        contents: faker.random.words(7),
        sender: true
    },
    {
        contents: faker.random.words(8),
        sender: false
    }
];