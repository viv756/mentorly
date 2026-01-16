import type { SKILL_CATEGORY_ENUM_TYPE, SKILL_ENUM_TYPE, SKILL_LEVEL_ENUM_TYPE } from "@/constant";

export type CreateNewSkillPayload = {
  skillName: string;
  skillType: SKILL_ENUM_TYPE;
  skillLevel: SKILL_LEVEL_ENUM_TYPE;
  description: string;
  category: SKILL_CATEGORY_ENUM_TYPE;
  experienceYears: number | undefined;
};

export interface UserSkill {
  _id: string;
  userId: string;
  skillName: string;
  skillType: SKILL_ENUM_TYPE;
  skillLevel: SKILL_LEVEL_ENUM_TYPE;
  category: SKILL_CATEGORY_ENUM_TYPE;
  description: string;
  experienceYears?: number;
  createdAt: string;
  updatedAt: string;
}

export type GetCurrentUserSkillsType = {
  message: string;
  learningGoals: UserSkill[];
  mentoringGoals: UserSkill[];
};
