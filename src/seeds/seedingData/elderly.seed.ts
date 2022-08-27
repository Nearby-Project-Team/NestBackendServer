import { IElderlyEntity } from '../seedingInterface/IElderlyEntity';
import { AgreementEnum } from 'src/common/types/agreement.type';

export const ElderlySeedData: IElderlyEntity[] = [
    {
        name: 'KimMin',
        agreement: AgreementEnum.agree
    },
    {
        name: 'HanWoo',
        agreement: AgreementEnum.agree
    }
];