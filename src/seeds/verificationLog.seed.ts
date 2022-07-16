import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { VerificationEntity } from 'src/common/entity/verificationLog.entity';

export class CreateInitialVerificationData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
                .createQueryBuilder()
                .insert()
                .into(VerificationEntity)
                .values([
                    { verification_type: 'REGISTER_EMAIL_VERIFICATION', verification_token: '8b2996de-8b9a-4034-8eb0-90d8fd7d320e' },
                    { verification_type: 'REGISTER_EMAIL_VERIFICATION', verification_token: '8196d83e-3ed1-4d92-8d9c-c8de0928602c' }
                ])
                .execute();
    }
}