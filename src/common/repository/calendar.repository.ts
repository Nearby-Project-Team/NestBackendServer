import { Repository } from "typeorm";
import { CustomRepository } from "../decorators/typeorm.decorator";
import { CalendarEntity } from "../entity/calendar.entity";
import { ScheduleTypeEnum } from 'src/common/types/schedule.type';

@CustomRepository(CalendarEntity)
export class CalendarRepository extends Repository<CalendarEntity> {

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

    async findAllCalendar(elderly_id: string) {
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
            }
        });
        return _c;
    }

    async findTypedCalendar(elderly_id: string, type: ScheduleTypeEnum) {
        const _c = await this.findAndCount({
            relations: {
                elderly_id: true
            },
            where: {
                elderly_id: {
                    uuid: elderly_id
                },
                notificationType: type
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return _c;
    }

}