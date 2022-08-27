import { AgreementEnum } from 'src/common/types/agreement.type';

export interface IElderlyEntity {
    name: string;
    agreement: AgreementEnum;
    phone_number: string;
    birthday: Date;
    token: string;
}