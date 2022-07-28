import { Injectable } from '@nestjs/common';
import { RequestError } from 'src/common/error/ErrorEntity/RequestError';
import { RequestErrorTypeEnum } from 'src/common/error/ErrorType/RequestErrorType.enum';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { AgreementEnum } from 'src/common/types/agreement.type';
import { ElderlyInfoDto } from './dtos/elderlyInfo.dto';
import { LinkCaregiverDto } from './dtos/linkCaregiver.dto';

@Injectable()
export class ElderlyService {
    constructor(
        private readonly elderlyRepository: ElderlyRepository,
        private readonly cgRepository: CaregiverRepository
    ) {}

    async registerElderly(info: ElderlyInfoDto) {
        const _e = this.elderlyRepository.create({ ...info, agreement: AgreementEnum.agree });
        await this.elderlyRepository.save(_e);
        return "Successfully Registered Elderly!";
    }

    async linkWithCaregiver(link: LinkCaregiverDto) {
        const _u = await this.cgRepository.findUserByEmail(link.cg_email);
        const _e = await this.elderlyRepository.findElderlyById(link.elderly_id);
        if (_e === null || _u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);

        await this.elderlyRepository.update({
            uuid: link.elderly_id
        }, {
            caregiver_id: _u
        });                

        return "Successfully link Elderly with Caregiver!";
    }

}
