import { IElderlyEntity } from '../seedingInterface/IElderlyEntity';
import { AgreementEnum } from 'src/common/types/agreement.type';
import { faker } from '@faker-js/faker';

export const ElderlySeedData: IElderlyEntity[] = [
    {
        name: 'KimMin',
        agreement: AgreementEnum.agree,
        phone_number: faker.phone.number("+82 10 #### ####"),
        birthday: faker.date.birthdate(),
        token: "123456789"
    },
    {
        name: 'HanWoo',
        agreement: AgreementEnum.agree,
        phone_number: faker.phone.number("+82 10 #### ####"),
        birthday: faker.date.birthdate(),
        token: "123456789"
    }
];