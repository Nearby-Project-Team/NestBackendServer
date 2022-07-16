import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CalandarEntity } from 'src/common/entity/calandar.entity'; 

export class CreateInitialCalandarData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
                .createQueryBuilder()
                .insert()
                .into(CalandarEntity)
                .values([
                    { contents: 'Medicine', ScheduleDate: '* * */6 * * *', notificationType: 'Repeat' }, 
                    { contents: 'Birthday', ScheduleDate: '2022-07-20', notificationType: 'single' }
                ])
                .execute()
    }
};