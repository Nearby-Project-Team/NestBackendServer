import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MySqlConfigModule } from './common/configs/typeorm.module';
import { MySQLConfigService } from './common/configs/typeorm.config';
import { ApplicationModule } from './modules/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: (process.env.NODE_ENV === 'production') ? './env/.production.env'
      : (process.env.NODE_ENV === 'stage') ? './env/.stage.env' : './env/.development.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySQLConfigService,
      inject: [MySQLConfigService]
    }),
    AuthModule, 
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
