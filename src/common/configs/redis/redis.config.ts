import { RedisClientOptions } from 'redis';

export function getRedisConfig ():string {
    return `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
};