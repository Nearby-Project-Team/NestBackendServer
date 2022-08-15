import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoiceFileEntity } from '../../common/entity/voiceFile.entity';
import { Repository } from 'typeorm';
import { VoiceModelEntity } from '../../common/entity/voiceModel.entity';
import { VoiceModelRelationEntity } from '../../common/entity/voiceRelation.entity';
import { CaregiverRepository } from '../../common/repository/caregiver.repository';
import { AppError } from '../../common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';
import { ElderlyRepository } from '../../common/repository/elderly.repository';
import { HttpService } from '@nestjs/axios';
import { TrainVoiceDto, TrainCompleteDto } from './dtos/train-voice.dto';
import { VoiceTypeEnum } from 'src/common/types/voice.type';

@Injectable()
export class VoiceService {
    constructor (
        @InjectRepository(VoiceFileEntity)
        private readonly vfRepository: Repository<VoiceFileEntity>,
        @InjectRepository(VoiceModelEntity)
        private readonly vmRepository: Repository<VoiceModelEntity>,
        @InjectRepository(VoiceModelRelationEntity)
        private readonly vrRepository: Repository<VoiceModelRelationEntity>,
        private readonly cgRepository: CaregiverRepository,
        private readonly elderlyRepository: ElderlyRepository,
        private readonly httpService: HttpService,
    ) {}

    async registerVoice(email: string, vname: string, fileName: string) {
        const _u = await this.cgRepository.findUserByEmail(Buffer.from(email, 'base64').toString('utf-8'));
        if (_u === null) throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        const [_e, _] = await this.elderlyRepository.findAllElderlyCaregiver(email);
        const _v = this.vfRepository.create({
            caregiver_id: _u,
            name: vname,
            path: `${email}/${vname}/audio/${fileName}`
        });
        await this.vfRepository.save(_v);
        const result = await Promise.all(_e.map(async (elderly) => {
            try {
                const _r = this.vrRepository.create({
                    elderly_id: elderly,
                    voiceModel_id: _v,
                });
                await this.vrRepository.save(_r);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }));
        if (result.includes(false)) throw new AppError(AppErrorTypeEnum.DB_SAVE_FAILED);
        return {
            msg: "Successfully registered Voice!"
        };
    }

    async trainUserVoice(item: TrainVoiceDto) {
        // TTS의 API를 부름
        const _u = await this.cgRepository.findUserByEmail(Buffer.from(item.email, 'base64').toString('utf-8'));
        if (_u === null) throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        const _vm = this.vmRepository.create({
            status: VoiceTypeEnum.NOT_TRAINED,
            path: `${_u.uuid}/${item.vname}/model/${item.vname}.pth`,
            caregiver_id: _u
        });
        await this.vmRepository.save(_vm);

        return {
            msg: "Success!"
        };
    }

    async trainVoiceComplete(item: TrainCompleteDto) {
        await this.vmRepository.update({
            caregiver_id: {
                uuid: item.caregiver_id
            },
            path: item.voice_path
        }, {
            status: VoiceTypeEnum.TRAINED
        });

        return {
            msg: "Success!"
        };
    }

}
