import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { Repository } from 'typeorm';
import { ChattingEntity } from '../../../common/entity/chatting.entity';
import { ChattingSeedData } from "src/seeds/seedingData/chatting.seed";
import { IChattingEntity } from "src/seeds/seedingInterface/IChattingEntity";
import { ElderlySeedData } from '../../seedingData/elderly.seed';

@Injectable()
export class ChattingSeederService {
    constructor (
        @InjectRepository(ElderlyEntity)
        private readonly elderlyRepository: Repository<ElderlyEntity>,
        @InjectRepository(ChattingEntity)
        private readonly chatRepository: Repository<ChattingEntity>
    ) {}

    create(): Array<Promise<boolean>> {
        return ChattingSeedData.map(async (chatData: IChattingEntity, index: number) => {
            try {
                let _e = await this.elderlyRepository.findOne({ where: { name: ElderlySeedData[Math.floor(index / 2)].name } });
                if (!_e) {
                    console.log('No Such Elderly!!');
                    return false;
                }
                const _c = this.chatRepository.create({ ...chatData, elderly_id: _e });
                await this.chatRepository.save(_c);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        });
    }

}