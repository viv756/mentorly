export const SkillCategoryEnum = {
  TECHNOLOGY: "TECHNOLOGY",
  MUSIC: "MUSIC",
  LANGUAGES: "LANGUAGES",
  DESIGN: "DESIGN",
  FITNESS: "FITNESS",
  BUSINESS: "BUSINESS",
  EDUCATION: "EDUCATION",
  PERSONAL_DEVELOPMENT: "PERSONAL_DEVELOPMENT",
  HOBBIES: "HOBBIES",
} as const;

export const SkillLevelEnum = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
} as const;

export const SkillTypeEnum = {
  TEACH: "TEACH",
  LEARN: "LEARN",
} as const;

export type SkillCategoryEnumType = (typeof SkillCategoryEnum)[keyof typeof SkillCategoryEnum];
export type SkillLevelEnumType = (typeof SkillLevelEnum)[keyof typeof SkillLevelEnum];
export type SkillType = (typeof SkillTypeEnum)[keyof typeof SkillTypeEnum];
