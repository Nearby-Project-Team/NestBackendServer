import { Repository } from "typeorm";
import { CustomRepository } from "../decorators/typeorm.decorator";
import { CalandarEntity } from "../entity/calandar.entity";

@CustomRepository(CalandarEntity)
export class CalandarRepository extends Repository<CalandarEntity> {

    private readonly PAGE_NUM = 30;

    async findAllCalendarByElderlyId(elderly_id: string, page: number) {
        const offset = (page - 1) * this.PAGE_NUM;
        const _c = await this.findAndCount({
            relations: {
                elderly_id: true
            },
            where: {
                elderly_id: {
                    uuid: elderly_id
                }
            },
            order: {
                createdAt: 'DESC'
            },
            skip: offset,
            take: this.PAGE_NUM
        });
        return _c;
    }

}