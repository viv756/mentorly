const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour24 = Number(h);

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return `${hour12.toString().padStart(2, "0")}:${m} ${period}`;
};

export default formatTime;


