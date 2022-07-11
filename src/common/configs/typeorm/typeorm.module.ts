import { Module } from '@nestjs/common';
import { MySQLConfigService } from './typeorm.config';

@Module({
  providers: [MySQLConfigService],
})
export class MySqlConfigModule {}