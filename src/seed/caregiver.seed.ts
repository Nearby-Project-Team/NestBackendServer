import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CaregiverEntity } from "src/common/entity/caregiver.entity";

export class CreateInitialCaregiverData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
                .createQueryBuilder()
                .insert()
                .into(CaregiverEntity)
                .values([
                    { email: "kimh060612@khu.ac.kr", name: 'Gihyun Kim', password: '1212', phone_number: '01040620460', status: 'Y' },
                    { email: "lmhapy25@khu.ac.kr", name: 'Subin Park', password: '4545', phone_number: '01053934775', status: 'Y' },
                ])
                .execute();
    }
};
