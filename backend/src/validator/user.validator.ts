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

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
