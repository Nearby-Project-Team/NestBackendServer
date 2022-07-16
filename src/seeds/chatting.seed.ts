import { Connection } from "typeorm";
import { Factory, Seeder } from 'typeorm-seeding';
import { ChattingEntity } from "src/common/entity/chatting.entity";

export class CreateInitialChattingData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
                .createQueryBuilder()
                .insert()
                .into(ChattingEntity)
                .values([
                    { contents: 'Hello!', sender: false },
                    { contents: 'World!', sender: true },
                    { contents: 'Kueeek', sender: false },
                    { contents: 'Bueuukg', sender: true }
                ])
                .execute();
    }
}