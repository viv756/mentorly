import cron from "node-cron";
import SessionModel from "../models/session.model";
import { SessionStatusEnum, AttendanceStatusEnum } from "../enums/session.enum";

// Runs every minute (you can adjust)
export const startSessionAttendanceCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running attendance check cron job...", new Date());

    try {
      const sessions = await SessionModel.find({
        status: SessionStatusEnum.ACCEPTED,
        to: { $lt: new Date() },
      });

      for (const s of sessions) {
        const mentor = !!s.attendance?.mentorJoinedAt;
        const learner = !!s.attendance?.learnerJoinedAt;

        let attendanceStatus;

        if (mentor && learner) attendanceStatus = AttendanceStatusEnum.BOTH_PRESENT;
        else if (!mentor && !learner) attendanceStatus = AttendanceStatusEnum.BOTH_NO_SHOW;
        else if (!mentor) attendanceStatus = AttendanceStatusEnum.MENTOR_NO_SHOW;
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
      }

      console.log("Attendance updated for past sessions");
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  });
};
