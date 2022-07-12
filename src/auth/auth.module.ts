import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaregiverEntity } from '../common/entity/caregiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaregiverEntity])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
