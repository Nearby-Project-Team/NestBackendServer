import { Module } from '@nestjs/common';
import { ElderlyService } from './elderly.service';
import { ElderlyController } from './elderly.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';

@Module({
  imports: [
    TypeORMRepositoryModule.forCustomRepository([
      ElderlyRepository,
      CaregiverRepository
    ])
  ],
  controllers: [ElderlyController],
  providers: [ElderlyService]
})
export class ElderlyModule {}
