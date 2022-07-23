import { faker } from '@faker-js/faker';
import { IVerificationLogEntity } from '../seedingInterface/IVerificationLogEntity';
import { VerificationTypeEnum } from 'src/common/dtos/verification/verification.dto';

export const VerificationSeedData: IVerificationLogEntity[] = [
    {
        verification_type: VerificationTypeEnum.register,
        verification_token: faker.datatype.uuid()
    },
    {
        verification_type: VerificationTypeEnum.register,
        verification_token: faker.datatype.uuid()
    }
];