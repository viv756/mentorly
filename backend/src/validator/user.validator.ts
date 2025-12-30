import { z } from "zod";

/**
 * Social links validation
 */
const socialLinksSchema = z.object({
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .nullable()
    .optional(),

  github: z
    .string()
    .url("Invalid GitHub URL")
    .nullable()
    .optional(),

  twitter: z
    .string()
    .url("Invalid Twitter URL")
    .nullable()
    .optional(),
});

/**
 * Create profile schema
 */
export const createProfileSchema = z.object({
  avatar: z.string().url("Invalid avatar URL").nullable().optional(),

  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .nullable()
    .optional(),

  socialLinks: socialLinksSchema.optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
