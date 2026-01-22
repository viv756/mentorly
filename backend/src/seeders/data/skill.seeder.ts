import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import {
  SkillCategoryEnum,
  SkillCategoryEnumType,
  SkillLevelEnum,
  SkillTypeEnum,
} from "../../enums/skill.enum";

export const SKILLS_BY_CATEGORY = {
  [SkillCategoryEnum.TECHNOLOGY]: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "System Design",
  ],

  [SkillCategoryEnum.DESIGN]: [
    "UI Design",
    "UX Research",
    "Figma",
    "Adobe XD",
    "Wireframing",
    "Design Systems",
    "Prototyping",
    "User Testing",
  ],

  [SkillCategoryEnum.BUSINESS]: [
    "Startup Strategy",
    "Product Management",
    "Market Research",
    "Sales",
    "Digital Marketing",
    "SEO",
    "Growth Hacking",
    "Pitch Deck Creation",
  ],

  [SkillCategoryEnum.LANGUAGES]: [
    "English",
    "Spanish",
    "German",
    "French",
    "Italian",
    "Japanese",
    "Mandarin",
  ],

  [SkillCategoryEnum.MUSIC]: [
    "Guitar",
    "Piano",
    "Music Theory",
    "Music Production",
    "Songwriting",
    "Vocal Training",
  ],

  [SkillCategoryEnum.FITNESS]: [
    "Strength Training",
    "Yoga",
    "Pilates",
    "Cardio Training",
    "Nutrition Basics",
    "Weight Loss Coaching",
  ],

  [SkillCategoryEnum.EDUCATION]: [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Data Structures",
    "Algorithms",
    "Exam Preparation",
  ],

  [SkillCategoryEnum.PERSONAL_DEVELOPMENT]: [
    "Public Speaking",
    "Time Management",
    "Leadership",
    "Communication Skills",
    "Confidence Building",
    "Goal Setting",
  ],

  [SkillCategoryEnum.HOBBIES]: [
    "Photography",
    "Cooking",
    "Travel Planning",
    "Chess",
    "Painting",
    "Creative Writing",
  ],
} as const;

const shuffle = <T>(arr: readonly T[]) => faker.helpers.shuffle([...arr]);

export const generateUserSkills = (
  userId: mongoose.Types.ObjectId,
  count = 3,
) => {
  const allSkills = Object.entries(SKILLS_BY_CATEGORY).flatMap(
    ([category, skills]) =>
      skills.map((skillName) => ({
        category: category as SkillCategoryEnumType,
        skillName,
      })),
  );

  const selectedSkills = shuffle(allSkills).slice(0, count);

  return selectedSkills.map(({ category, skillName }) => {
    const skillType = faker.helpers.arrayElement([
      SkillTypeEnum.TEACH,
      SkillTypeEnum.LEARN,
    ]);

    const base = {
      userId,
      skillName,
      category,
      skillType,
      skillLevel: faker.helpers.arrayElement(
        Object.values(SkillLevelEnum),
      ),
      description: faker.lorem.sentences(30),
    };

    return skillType === SkillTypeEnum.TEACH
      ? {
          ...base,
          experienceYears: faker.number.int({ min: 1, max: 10 }),
        }
      : base;
  });
};
