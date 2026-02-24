import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const badgeQueue = new Queue("badgeQueue", {
  connection: redisConnection,
});