import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { CalendarEntity } from '../../../common/entity/calendar.entity';
import { CalendarSeederService } from './calendar.seed';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ElderlyEntity,
            CalendarEntity
        ]),
    ],
    providers: [ CalendarSeederService ],
    exports: [ CalendarSeederService ]
})
export class CalandarSeederModule {}