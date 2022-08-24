import { Module } from '@nestjs/common';
import { CalandarService } from './calandar.service';
import { CalandarController } from './calandar.controller';
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
  controllers: [CalandarController],
  providers: [CalandarService]
})
export class CalandarModule {}
