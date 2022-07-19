import { Module, Logger } from '@nestjs/common';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';
import { DataSeederModule } from './seedService/seed.module';
import { Seeder } from './seeder.service';

@Module({
    imports: [
        MySQLDBProviderModule,
        DataSeederModule
    ],
    providers: [ Logger, Seeder ]
})
export class SeederModule {}