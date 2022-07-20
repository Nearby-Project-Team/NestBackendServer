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

@Module({
  imports: [
    TypeOrmModule.forFeature([CaregiverEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' }
    })
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
