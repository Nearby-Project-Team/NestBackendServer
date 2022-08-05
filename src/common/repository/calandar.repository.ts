import { Repository } from "typeorm";
import { CustomRepository } from "../decorators/typeorm.decorator";
import { CalandarEntity } from "../entity/calandar.entity";

@CustomRepository(CalandarEntity)
export class CalandarRepository extends Repository<CalandarEntity> {

    

}