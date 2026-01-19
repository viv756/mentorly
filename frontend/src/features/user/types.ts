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

type MatchedSkill = {
  skillName: string;
  category: string;
  skillType: string;
  skillLevel: string;
};

export type MatchedUser = {
  totalScore: number;
  matchedSkills: MatchedSkill[];
  profile: {
    bio: string;
    location: string;
    rating: {
      average: number;
      count: number;
    };
    avatar: string;
  };
  userId: string;
  name: string;
  email: string;
};

export type GetFindPeopleResponse = {
  message: string;
  users: MatchedUser[];
};
