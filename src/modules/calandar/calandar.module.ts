import { Module } from '@nestjs/common';
import { CalandarService } from './calandar.service';
import { CalandarController } from './calandar.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { CalandarRepository } from 'src/common/repository/calandar.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';

@Module({
  imports: [
    TypeORMRepositoryModule.forCustomRepository([
      CalandarRepository,
      ElderlyRepository
    ]),
  ],
  controllers: [CalandarController],
  providers: [CalandarService]
})
export class CalandarModule {}
