import { IChattingEntity } from '../seedingInterface/IChattingEntity';
import { faker } from '@faker-js/faker';

export const ChattingSeedData: IChattingEntity[] = [
    {
        contents: faker.random.words(5),
        sender: 'C'
    },
    {
        contents: faker.random.words(10),
        sender: 'E'
    },
    {
        contents: faker.random.words(7),
        sender: 'C'
    },
    {
        contents: faker.random.words(8),
        sender: 'E'
    }
];