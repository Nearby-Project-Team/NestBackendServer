import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ElderlyEntity } from 'src/common/entity/elderly.entity';

export class CreateInitialElderlyData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
                .createQueryBuilder()
                .insert()
                .into(ElderlyEntity)
                .values([
                    { name: 'KimMin' },
                    { name: 'HanWoo' }
                ])
                .execute()

    }
};