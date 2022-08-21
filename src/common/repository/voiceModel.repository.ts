import { CustomRepository } from "../decorators/typeorm.decorator";
import { VoiceModelEntity } from '../entity/voiceModel.entity';
import { Repository } from 'typeorm';

@CustomRepository(VoiceModelEntity)
export class VoiceModelRepository extends Repository<VoiceModelEntity> {

    async findVoiceModelByCaregiverId(caregiver_id: string) {
        const _vm = await this.findOne({
            relations: {
                caregiver_id: true
            },
            where: {
                caregiver_id: {
                    uuid: caregiver_id
                }
            }
        });
        return _vm;
    }

}