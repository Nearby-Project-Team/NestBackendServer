import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { GlobalErrorDispatcher } from './common/exceptions/global.exception';
import * as cookieParser from 'cookie-parser';
import { RedisIoAdapter } from './common/adapter/redis.adapter';

async function bootstrap() {
  console.log(`Backend ${process.env.NODE_ENV} mode starting...`);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidUnknownValues: true
  }));
  app.useGlobalFilters(new GlobalErrorDispatcher());
  await app.listen(3000);
}
bootstrap();
