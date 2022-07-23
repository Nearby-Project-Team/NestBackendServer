import { VerificationTypeEnum } from 'src/common/dtos/verification/verification.dto';

export interface IVerificationLogEntity {
    verification_type: VerificationTypeEnum;
    verification_token: string;
}