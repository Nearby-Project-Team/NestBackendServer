import { getRedisConfig } from '../../../common/configs/redis/redis.config';
import { createClient } from 'redis';

export const REDIS = Symbol('AUTH:REDIS');
export async function getRedisClient() {
    let redisConfig = getRedisConfig();
    let redis = createClient({ url: redisConfig });
    await redis.connect();
    return redis;
}