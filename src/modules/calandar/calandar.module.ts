import { Module } from '@nestjs/common';
import { CalandarService } from './calandar.service';
import { CalandarController } from './calandar.controller';

@Module({
  controllers: [CalandarController],
  providers: [CalandarService]
})
export class CalandarModule {}
