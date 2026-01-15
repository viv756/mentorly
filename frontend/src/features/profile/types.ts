import { z } from "zod";
import type { formSchema } from "@/pages/dashboard/profile/_components/updateProfile-form";

export type UpdateProfileFormPayload = z.infer<typeof formSchema>;

export type UserProfileType = {
  _id: string,
  userId:{}
}