import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaregiverEntity } from '../common/entity/caregiver.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { NodeMailerModule } from '../providers/mailer/mailer.module';
import { VerificationEntity } from '../common/entity/verificationLog.entity';
import { TypeORMRepositoryModule } from '../common/repository/typeorm.repository';
import { CaregiverRepository } from '../common/repository/caregiver.repository';
import { ElderlyRepository } from '../common/repository/elderly.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VerificationEntity
    ]),
    TypeORMRepositoryModule.forCustomRepository([
      CaregiverRepository,
      ElderlyRepository
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' }
    }),
    NodeMailerModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
