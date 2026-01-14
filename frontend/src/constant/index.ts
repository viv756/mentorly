export const SKILL_CATEGORY_ENUM = {
  PERSONAL_DEVELOPMENT: "PERSONAL_DEVELOPMENT",
  TECHNOLOGY: "TECHNOLOGY",
  MUSIC: "MUSIC",
  LANGUAGES: "LANGUAGES",
  DESIGN: "DESIGN",
  FITNESS: "FITNESS",
  BUSINESS: "BUSINESS",
  EDUCATION: "EDUCATION",
  HOBBIES: "HOBBIES",
} as const;

export const SKILL_CATEGORY = [
  { value: SKILL_CATEGORY_ENUM.PERSONAL_DEVELOPMENT, label: "Personal development" },
  { value: SKILL_CATEGORY_ENUM.TECHNOLOGY, label: "Technology" },
  { value: SKILL_CATEGORY_ENUM.MUSIC, label: "Music" },
  { value: SKILL_CATEGORY_ENUM.LANGUAGES, label: "Languages" },
  { value: SKILL_CATEGORY_ENUM.DESIGN, label: "Design" },
  { value: SKILL_CATEGORY_ENUM.FITNESS, label: "Fitness" },
  { value: SKILL_CATEGORY_ENUM.BUSINESS, label: "Business" },
  { value: SKILL_CATEGORY_ENUM.EDUCATION, label: "Education" },
  { value: SKILL_CATEGORY_ENUM.HOBBIES, label: "Hobbies" },
];

export const SKILL_TYPE_ENUM = {
  TEACH: "TEACH",
  LEARN: "LEARN",
} as const;

export const SKILL_TYPE = [
  { value: SKILL_TYPE_ENUM.LEARN, label: "Learn" },
  { value: SKILL_TYPE_ENUM.TEACH, label: "Teach" },
];

export const SKILL_LEVEL_ENUM = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
} as const;

export const SKILL_LEVEL = [
  { value: SKILL_LEVEL_ENUM.BEGINNER, label: "Beginner" },
  { value: SKILL_LEVEL_ENUM.INTERMEDIATE, label: "Intermediate" },
  { value: SKILL_LEVEL_ENUM.ADVANCED, label: "Advanced" },
];

export const WEEK_DAY = {
  MON: "Mon",
  TUE: "Tue",
  WED: "Wed",
  THU: "Thu",
  FRI: "Fri",
  SAT: "Sat",
  SUN: "Sun",
};
