import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorDispatcher } from './common/exceptions/global.exception';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  console.log(`Backend ${process.env.NODE_ENV} mode starting...`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidUnknownValues: true
  }));
  app.useGlobalFilters(new GlobalErrorDispatcher());
  app.use(cookieParser());
  app.use(bodyParser.raw());
  await app.listen(3000);
}
bootstrap();
