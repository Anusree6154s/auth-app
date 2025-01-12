"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const constants_1 = require("../config/constants");
// export const getRedisClient = () => {
//   const redisClient = createClient({ url: redis_url });
//   redisClient.connect().catch((err) => {
//     console.error("Redis connection error:", err);
//   });
//   return redisClient;
// };
exports.redisClient = (0, redis_1.createClient)({ url: constants_1.redis_url, legacyMode: false });
exports.redisClient.connect().catch((err) => {
    console.error("Redis connection error:", err);
});
