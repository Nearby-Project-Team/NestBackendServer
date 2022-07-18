import { faker } from '@faker-js/faker';
import { Factory } from "@concepta/typeorm-seeding";
import { CaregiverEntity } from "src/common/entity/caregiver.entity";
import { FactoryOptions } from '@concepta/typeorm-seeding/dist/factory';
import { ObjectLiteral } from 'typeorm';

export class CaregiverFactory extends Factory<CaregiverEntity> {
    protected options: FactoryOptions<CaregiverEntity, ObjectLiteral> = {
        entity: CaregiverEntity
    };

    protected async entity(_entity?: CaregiverEntity): Promise<CaregiverEntity> {
        if (_entity) return _entity;
        const caregiver = new CaregiverEntity();
        caregiver.name = `${faker.name.firstName()} ${faker.name.lastName}`;
        caregiver.email = faker.internet.email();
        caregiver.password = faker.internet.password();
        caregiver.phone_number = faker.phone.number();
        caregiver.status = "Y";
        return caregiver;
    }
};