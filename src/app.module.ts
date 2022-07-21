import { Module, NestModule, Inject, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './modules/application.module';
import { RedisModule } from './providers/database/redis/redis.module';
import { REDIS } from 'src/providers/database/redis/redis.constants';
import { MySQLDBProviderModule } from 'src/providers/database/mysql/mysql.module';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [
    MySQLDBProviderModule,
    AuthModule, 
    ApplicationModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisStore.Client) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: 'key',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 14 * 24 * 60 * 60 * 1000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
