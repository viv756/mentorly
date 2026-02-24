import IORedis from "ioredis";
import { Env } from "./env.config";

export const redisConnection = new IORedis(Env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisConnection.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});
