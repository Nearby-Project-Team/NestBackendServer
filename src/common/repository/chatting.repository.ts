import { Repository } from "typeorm";
import { CustomRepository } from "../decorators/typeorm.decorator";
import { ChattingEntity } from "../entity/chatting.entity";

@CustomRepository(ChattingEntity)
export class ChattingRepository extends Repository<ChattingEntity> {
    
    private readonly PAGE_NUM = 20;

    async getChattingHistory(elderly_id: string, page: number) {
        let offset = (page - 1) * this.PAGE_NUM;
        const _c = await this.findAndCount({
            where: {
                uuid: elderly_id
            },
            order: {
                createdAt: 'DESC',
            },
            skip: offset,
            take: this.PAGE_NUM
        });
        return _c;
    }

    async saveChatting(
        elderly_id: string, 
        content: string, 
        date: Date
    ) {
        
    }

}