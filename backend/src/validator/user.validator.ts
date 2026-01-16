import { z } from "zod";

/**
 * Social links validation
 */
export const socialLinksSchema = z
  .array(
    z.object({
      platform: z.enum(["linkedin", "github", "twitter"]),
      url: z.string().url("Invalid social link URL"),
    })
  )
  .optional();

/**
 * Create profile schema
 */
export const updateProfileSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be at most 500 characters").nullable().optional(),
  socialLinks: socialLinksSchema.optional(),
});

/* =======================
   Constants
======================= */

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/* =======================
   Schemas
======================= */

const timeSlotSchema = z
  .object({
    from: z.string().regex(/^\d{2}:\d{2}$/),
    to: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .refine((v) => v.from < v.to, {
    message: "End time must be after start time",
    path: ["to"],
  });

export const weeklyAvailabilitySchema = z
  .object({
    Mon: z.array(timeSlotSchema).optional(),
    Tue: z.array(timeSlotSchema).optional(),
    Wed: z.array(timeSlotSchema).optional(),
    Thu: z.array(timeSlotSchema).optional(),
    Fri: z.array(timeSlotSchema).optional(),
    Sat: z.array(timeSlotSchema).optional(),
    Sun: z.array(timeSlotSchema).optional(),
  })
  .refine(
    (data) => Object.values(data).some((slots) => slots && slots.length > 0),
    {
      message: "At least one day must have availability",
    }
  );


/* =======================
   Types
======================= */

export type WeeklyAvailabilityDTO = z.infer<typeof weeklyAvailabilitySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
