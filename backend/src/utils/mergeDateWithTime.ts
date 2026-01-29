export const mergeDateWithTime = (dateStr: string, timeISO: Date) => {
  const time = new Date(timeISO);

  const [year, month, day] = dateStr.split("-").map(Number);

  return new Date(
    Date.UTC(
      year,
      month - 1, // month is 0-based
      day,
      time.getUTCHours(),
      time.getUTCMinutes(),
      time.getUTCSeconds(),
      time.getUTCMilliseconds(),
    ),
  );
};
