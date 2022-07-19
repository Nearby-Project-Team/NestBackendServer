
import { Module } from '@nestjs/common';
import { REDIS, getRedisClient } from './redis.constants';

@Module({
    providers: [
        {
            provide: REDIS,
            useFactory: getRedisClient,
        },
    ],
    exports: [REDIS],
})
export class RedisModule {}