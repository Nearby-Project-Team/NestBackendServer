import { Repository } from 'typeorm';
import { CustomRepository } from '../decorators/typeorm.decorator';
import { CaregiverEntity } from '../entity/caregiver.entity';

@CustomRepository(CaregiverEntity)
export class CaregiverRepository extends Repository<CaregiverEntity> {
    async findUserByEmail(email: string) {
        const _u = await this.findOne({
            where: {
                email: email
            }
        }); 
        return _u;
    }

    async findUserByPhoneNumber(phone_number: string) {
        const _u = await this.findOne({
            where: {
                phone_number: phone_number
            }
        });
        return _u;
    }
}