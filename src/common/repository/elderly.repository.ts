import { Repository } from "typeorm";
import { CustomRepository } from "../decorators/typeorm.decorator";
import { CaregiverEntity } from "../entity/caregiver.entity";
import { ElderlyEntity } from "../entity/elderly.entity";

@CustomRepository(ElderlyEntity)
export class ElderlyRepository extends Repository<ElderlyEntity> {
    async findElderlyByNameAndCG(name: string, cgId: string) {
        const _e = await this.findAndCount({
            relations: {
                caregiver_id: true
            },
            where: {
                name: name,
                caregiver_id: {
                    uuid: cgId
                }
            }
        });

        return _e;
    }

    async findElderlyById(uuid: string) {
        const _e = await this.findOne({
            where: {
                uuid: uuid
            }
        });
        return _e;
    }

    async findAllElderlyCaregiver(email: string) {
        const elderlyList = await this.findAndCount({
            where: { 
                caregiver_id: {
                    email: email
                }
            },
            relations: {
                caregiver_id: true
            }
        });
        return elderlyList;
    }

    async checkElderlyLinkedCargiver(elderly_id: string, email: string) {
        const _e = await this.findOne({
            relations: {
                caregiver_id: true
            },
            where: {
                uuid: elderly_id,
                caregiver_id: {
                    email: email
                }
            }
        });
        if (_e === null) return false;
        else return true;
    }

}