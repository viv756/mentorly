import { z } from "zod";
import { SkillTypeEnum, SkillLevelEnum, SkillCategoryEnum } from "../enums/skill.enum";
import { WeekDay } from "../enums/date-range.enum";

/* ---------- Availability ---------- */

const availabilitySchema = z.object({
  days: z
    .array(z.enum(Object.values(WeekDay) as [string, ...string[]]))
    .min(1, "At least one day is required"),

  timeSlots: z
    .array(z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Invalid time slot"))
    .min(1, "At least one time slot is required"),
});

/* ---------- User Skill ---------- */

export const userSkillZodSchema = z
  .object({
    skillName: z.string().trim().min(1),
    skillType: z.enum(Object.values(SkillTypeEnum) as [string, ...string[]]),
    skillLevel: z.enum(Object.values(SkillLevelEnum) as [string, ...string[]]),
    description: z
      .string()
      .min(10, "Description is too short")
      .max(200, "Description must be under 200 characters"),
    category: z.enum(Object.values(SkillCategoryEnum) as [string, ...string[]]),
    experienceYears: z.number().int().min(0).optional(),
    availability: availabilitySchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.skillType === SkillTypeEnum.TEACH) {
      if (data.experienceYears == null) {
        ctx.addIssue({
          path: ["experienceYears"],
          message: "Experience years is required for teaching skills",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.availability) {
        ctx.addIssue({
          path: ["availability"],
          message: "Availability is required for teaching skills",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const skillIdSchema = z.string().trim().min(1);

export type userSkillType = z.infer<typeof userSkillZodSchema>;
