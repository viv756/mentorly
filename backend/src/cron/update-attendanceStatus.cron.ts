import cron from "node-cron";
import SessionModel from "../models/session.model";
import ProfileModel from "../models/profile.model";
import { SessionStatusEnum, AttendanceStatusEnum } from "../enums/session.enum";
import { evaluateSessionBadges } from "../services/achievement.service";

// Runs every 5 minute
export const startSessionAttendanceCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running attendance check cron job...", new Date());

    try {
      const sessions = await SessionModel.find({
        status: SessionStatusEnum.ACCEPTED,
        to: { $lt: new Date() },
      });

      const processedUserIds = new Set<string>();

      for (const s of sessions) {
        const mentorPresent = !!s.attendance?.mentorJoinedAt;
        const learnerPresent = !!s.attendance?.learnerJoinedAt;

        let attendanceStatus;

        if (mentorPresent && learnerPresent) attendanceStatus = AttendanceStatusEnum.BOTH_PRESENT;
        else if (!mentorPresent && !learnerPresent)
          attendanceStatus = AttendanceStatusEnum.BOTH_NO_SHOW;
        else if (!mentorPresent) attendanceStatus = AttendanceStatusEnum.MENTOR_NO_SHOW;
        else attendanceStatus = AttendanceStatusEnum.LEARNER_NO_SHOW;

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

        // ✅ Increment completed session only if user attended
        if (mentorPresent) {
          await ProfileModel.updateOne(
            { userId: s.mentorId },
            { $inc: { "achievements.completedSessions": 1 } },
          );
          processedUserIds.add(s.mentorId.toString());
        }

        if (learnerPresent) {
          await ProfileModel.updateOne(
            { userId: s.learnerId },
            { $inc: { "achievements.completedSessions": 1 } },
          );
          processedUserIds.add(s.learnerId.toString());
        }
      }

      // Run badge evaluation once per user
      for (const userId of processedUserIds) {
        await evaluateSessionBadges(userId);
      }

      console.log("Attendance updated, stats incremented & badges evaluated");
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  });
};
