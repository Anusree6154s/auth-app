import { createClient } from "redis";
import { redis_url } from "../config/constants";

export const redisClient = createClient({ url: redis_url });
redisClient.connect().catch((err) => {
  console.error("Redis connection error:", err);
});