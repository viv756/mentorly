import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getAgoraExpireSeconds(date: string, to: string, timezoneStr: string): number {
  const meetingEnd = dayjs.tz(`${date} ${to}`, "YYYY-MM-DD hh:mm A", timezoneStr).utc();

  const now = dayjs.utc();
  const diff = meetingEnd.diff(now, "second");

  // add 10 min buffer
  return Math.max(diff + 600, 0);
}

export const toUTCDate = (date: string, time: string, tz: string): Date => {
  return dayjs.tz(`${date} ${time}`, "YYYY-MM-DD hh:mm A", tz).utc().toDate();
};
