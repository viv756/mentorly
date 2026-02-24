import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { evaluateSessionBadges } from "../services/achievement.service";

export const startBadgeWorker = () => {
  const worker = new Worker(
    "badgeQueue",
    async (job) => {

      const { userId } = job.data;

      console.log("🏅 Evaluating badges:", userId);

      await evaluateSessionBadges(userId);
    },
    {
      connection: redisConnection,
    }
  );

  worker.on("completed", (job) => {
    console.log("✅ Badge job completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.log("❌ Badge job failed:", err);
  });

  console.log("🚀 Badge Worker Started");
};