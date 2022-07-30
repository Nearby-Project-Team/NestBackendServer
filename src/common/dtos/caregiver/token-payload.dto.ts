import { UserTypeEnum } from 'src/common/types/user.type';

export class CaregiverTokenPayloadDto {
    public readonly email: string;
    public readonly status: UserTypeEnum;
}