import { createClient } from "redis";
import { redis_url } from "../config/constants";

// export const getRedisClient = () => {
//   const redisClient = createClient({ url: redis_url });
//   redisClient.connect().catch((err) => {
//     console.error("Redis connection error:", err);
//   });
//   return redisClient;
// };

export const redisClient = createClient({ url: redis_url, legacyMode: false });
redisClient.connect().catch((err) => {
  console.error("Redis connection error:", err);
});
