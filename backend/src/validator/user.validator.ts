import { z } from "zod";

/**
 * Social links validation
 */
export const socialLinksSchema = z
  .array(
    z.object({
      platform: z.enum(["linkedin", "github", "twitter"]),
      url: z.string().url("Invalid social link URL"),
    }),
  )
  .optional();

/**
 * Create profile schema
 */
export const updateProfileSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(120, "Bio must be at most 120 characters").nullable().optional(),
  aboutMe: z.string().max(1500, "About me must be at most 1500 characters").nullable().optional(),
  socialLinks: socialLinksSchema.optional(),
});

/* =======================
   Constants
======================= */

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/* =======================
   Schemas
======================= */

export const timeSlotSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((v) => new Date(v.from).getTime() < new Date(v.to).getTime(), {
    message: "End time must be after start time",
    path: ["to"],
  });
  
export const weeklyAvailabilitySchema = z.object({
  Sun: z.array(timeSlotSchema).optional(),
  Mon: z.array(timeSlotSchema).optional(),
  Tue: z.array(timeSlotSchema).optional(),
  Wed: z.array(timeSlotSchema).optional(),
  Thu: z.array(timeSlotSchema).optional(),
  Fri: z.array(timeSlotSchema).optional(),
  Sat: z.array(timeSlotSchema).optional(),
});

/* =======================
   Types
======================= */

export type WeeklyAvailabilityDTO = z.infer<typeof weeklyAvailabilitySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
