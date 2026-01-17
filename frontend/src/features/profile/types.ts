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
