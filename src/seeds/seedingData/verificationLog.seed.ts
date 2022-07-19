import { IVerificationLogEntity } from '../seedingInterface/IVerificationLogEntity';
import { faker } from '@faker-js/faker';

export const VerificationSeedData: IVerificationLogEntity[] = [
    {
        verification_type: 'email',
        verification_token: faker.datatype.uuid()
    },
    {
        verification_type: 'email',
        verification_token: faker.datatype.uuid()
    }
];