import { Module, Logger } from '@nestjs/common';
import { DataSeederModule } from './seedService/seed.module';
import { Seeder } from './seeder.service';

@Module({
    imports: [
        DataSeederModule
    ],
    providers: [ 
        Logger, 
        Seeder 
    ]
})
export class SeederModule {}