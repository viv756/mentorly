import { z } from "zod";
import type { formSchema } from "@/pages/dashboard/profile/_components/updateProfile-form";

export type UpdateProfileFormPayload = z.infer<typeof formSchema>;

// not finished
export type UserProfileType = {
  _id: string;
  userId: {};
};

export interface TimeSlot {
  from: string; // "HH:mm"
  to: string; // "HH:mm"
}

export type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type WeeklyAvailability = Partial<Record<WeekDay, TimeSlot[]>>;
export type SocialIconKey = "linkedin" | "github" | "twitter";

export type SocialLink = {
  platform: SocialIconKey;
  url: string;
};

export type SkillType = {
  category: string;
  description: string;
  experienceYears: number;
  skillId: string;
  skillLevel: string;
  skillName: string;
  skillType: string;
};

export type ProfileType = {
  aboutMe: string;
  avatar: string;
  bio: string;
  location: string;
  rating: {
    average: number;
    count: number;
  };
  socialLinks: SocialLink[];
};

export type UserType = {
  email: string;
  name: string;
  _id: string;
};

export type UserProfileByIdType = {
  profile: ProfileType;
  skills: SkillType[];
  user: UserType;
};

export type GetUserProfileByIdResponseType = {
  message: string;
  userProfile: UserProfileByIdType;
};
