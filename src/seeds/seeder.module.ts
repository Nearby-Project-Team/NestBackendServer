import { Module, Logger } from '@nestjs/common';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';
import { DataSeederModule } from './seedService/seed.module';

@Module({
    imports: [
        MySQLDBProviderModule,
        DataSeederModule
    ],
    providers: [ Logger ]
})
export class SeederModule {}