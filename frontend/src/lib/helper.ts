export const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour24 = Number(h);

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return `${hour12.toString().padStart(2, "0")}:${m} ${period}`;
};

export const formatWord = (word: string) =>
  word
    .toLowerCase() // "personal_development"
    .split(/[_-]/) // ["personal", "development"]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ["Personal", "Development"]
    .join(" "); // "Personal Development"

export const formatLocalDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const generateDates = (start: Date, totalDays: number) => {
  return Array.from({ length: totalDays }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    return {
      key: d.toDateString(),
      iso: formatLocalDate(d), // ✅ LOCAL date
      date: d.getDate(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    };
  });
};

export const getLast12MonthsRange = () => {
  const now = new Date();

  const endMonth = now.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  const startDate = new Date(now);
  startDate.setMonth(now.getMonth() - 11);

  const startMonth = startDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  return `${startMonth} – ${endMonth}`;
};
