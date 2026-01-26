import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAgoraExpirySeconds = (sessionEnd: Date | string) => {
  const now = Math.floor(Date.now() / 1000);
  const endTime =
    sessionEnd instanceof Date
      ? Math.floor(sessionEnd.getTime() / 1000)
      : Math.floor(new Date(sessionEnd).getTime() / 1000);

  const diff = endTime - now;

  if (diff <= 0) {
    throw new Error("Session already ended");
  }

  return diff;
};

export const toUTCDate = (date: string, time: string, tz: string): Date => {
  return dayjs.tz(`${date} ${time}`, "YYYY-MM-DD hh:mm A", tz).utc().toDate();
};
