export type TimeSlot = {
  from: string; // "HH:mm"
  to: string; // "HH:mm"
};

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type WeeklyAvailability = Partial<Record<WeekDay, TimeSlot[]>>;

export type User = {
  userId: string;
  profileId: string;
  userName: string;
  userEmail: string;
  avatar: string;
  weeklyAvailability?: WeeklyAvailability;
};

export type GetCurrentUserResponseType = {
  message: string;
  user: User;
};
