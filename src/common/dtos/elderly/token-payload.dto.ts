import { UserTypeEnum } from 'src/common/types/user.type';

export class ElderlyTokenPayloadDto {
    public readonly name: string;
    public readonly status: UserTypeEnum;
}