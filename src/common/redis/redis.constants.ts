import { getRedisConfig } from '../configs/redis/redis.config';
import { createClient, RedisClientType } from 'redis';

export const REDIS = Symbol('AUTH:REDIS');
export async function getRedisClient() {
    let redisConfig = getRedisConfig();
    let redis = createClient({ url: redisConfig });
    await redis.connect();
    return redis;
}