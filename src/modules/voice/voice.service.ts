import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoiceFileEntity } from '../../common/entity/voiceFile.entity';
import { Repository } from 'typeorm';
import { VoiceModelEntity } from '../../common/entity/voiceModel.entity';
import { VoiceModelRelationEntity } from '../../common/entity/voiceRelation.entity';
import { CaregiverRepository } from '../../common/repository/caregiver.repository';
import { VoiceMetadataDto } from './dtos/vmetadata.dto';
import { AppError } from '../../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';

@Injectable()
export class VoiceService {
    constructor (
        @InjectRepository(VoiceFileEntity)
        private readonly vfRepository: Repository<VoiceFileEntity>,
        @InjectRepository(VoiceModelEntity)
        private readonly vmRepository: Repository<VoiceModelEntity>,
        @InjectRepository(VoiceModelRelationEntity)
        private readonly vrRepository: Repository<VoiceModelRelationEntity>,
        private readonly cgRepository: CaregiverRepository
    ) {}

    async registerVoice(metaData: VoiceMetadataDto, filePath: string) {
        const _u = await this.cgRepository.findUserByEmail(metaData.email);
        if (_u === null) throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        const _v = await this.vfRepository.create({
            caregiver_id: _u,
            name: metaData.name,
            path: filePath
        });
        await this.vfRepository.save(_v);
        return "Success!";
    }

}
