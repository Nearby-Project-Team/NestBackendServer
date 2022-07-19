import { Module, Logger } from '@nestjs/common';
import { DataSeederModule } from './seedService/seed.module';
import { Seeder } from './seeder.service';
import { MySQLDBProviderModule } from '../providers/database/mysql/mysql.module';

@Module({
    imports: [
        MySQLDBProviderModule,
        DataSeederModule
    ],
    providers: [ 
        Logger, 
        Seeder 
    ]
})
export class SeederModule {}