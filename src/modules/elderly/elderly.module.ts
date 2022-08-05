import { Module } from '@nestjs/common';
import { ElderlyService } from './elderly.service';
import { ElderlyController } from './elderly.controller';
import { TypeORMRepositoryModule } from 'src/common/repository/typeorm.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CalandarRepository } from '../../common/repository/calandar.repository';
import { ChattingRepository } from '../../common/repository/chatting.repository';

@Module({
  imports: [
    TypeORMRepositoryModule.forCustomRepository([
      ElderlyRepository,
      CaregiverRepository,
      CalandarRepository,
      ChattingRepository
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' }
    }),
    PassportModule
  ],
  controllers: [ElderlyController],
  providers: [
    ElderlyService,
    JwtStrategy
  ]
})
export class ElderlyModule {}
