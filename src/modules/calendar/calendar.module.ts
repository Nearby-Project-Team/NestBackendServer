import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { CalendarRepository } from 'src/common/repository/calendar.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';

@Module({
  imports: [
    TypeORMRepositoryModule.forCustomRepository([
      CalendarRepository,
      ElderlyRepository
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule {}
