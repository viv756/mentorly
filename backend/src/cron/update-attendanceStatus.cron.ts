import cron from "node-cron";
import SessionModel from "../models/session.model";
import ProfileModel from "../models/profile.model";
import { SessionStatusEnum, AttendanceStatusEnum } from "../enums/session.enum";
import { badgeQueue } from "../queues/badge.queue";

// Runs every 5 minutes
export const startSessionAttendanceCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running attendance check cron job...", new Date());

    try {
      const now = new Date();

      // Get all accepted sessions scheduled up to today
      const sessions = await SessionModel.find({
        status: SessionStatusEnum.ACCEPTED,
        scheduledAt: { $lte: now },
      });

      for (const s of sessions) {
        // Combine scheduled date + end time
        const sessionDate = new Date(s.scheduledAt);
        const endTime = new Date(s.to);

        const sessionEnd = new Date(sessionDate);

        sessionEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

        // Skip if session not finished yet
        if (sessionEnd > now) continue;

        const mentorPresent = !!s.attendance?.mentorJoinedAt;
        const learnerPresent = !!s.attendance?.learnerJoinedAt;

        let attendanceStatus;

        if (mentorPresent && learnerPresent) attendanceStatus = AttendanceStatusEnum.BOTH_PRESENT;
        else if (!mentorPresent && !learnerPresent)
          attendanceStatus = AttendanceStatusEnum.BOTH_NO_SHOW;
        else if (!mentorPresent) attendanceStatus = AttendanceStatusEnum.MENTOR_NO_SHOW;
        else attendanceStatus = AttendanceStatusEnum.LEARNER_NO_SHOW;

        // Update session
        await SessionModel.updateOne(
          { _id: s._id },
          {
            $set: {
              attendanceStatus,
              status: SessionStatusEnum.COMPLETED,
              completedAt: new Date(),
            },
          },
        );

        // Mentor stats
        if (mentorPresent) {
          await ProfileModel.updateOne(
            { userId: s.mentorId },
            { $inc: { "achievements.completedSessions": 1 } },
          );

          await badgeQueue.add("evaluateBadge", { userId: s.mentorId });
        }

        // Learner stats
        if (learnerPresent) {
          await ProfileModel.updateOne(
            { userId: s.learnerId },
            { $inc: { "achievements.completedSessions": 1 } },
          );

          await badgeQueue.add("evaluateBadge", { userId: s.learnerId });
        }
      }

      console.log("Attendance updated & badges queued");
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  });
};
