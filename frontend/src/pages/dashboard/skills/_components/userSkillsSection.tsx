import type { UserSkill } from "@/features/skills/types";
import SkillCard from "./skill-card";
import type { SKILL_ENUM_TYPE } from "@/constant";

type UserSkillsSectionProps = {
  skills: UserSkill[];
  type: SKILL_ENUM_TYPE;
};

const UserSkillsSection = ({ skills, type }: UserSkillsSectionProps) => {
  if (skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-full ">
        <div className="h-full">
          <h1>Add skills to show</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {skills.map((skill) => (
        <SkillCard key={skill._id} skill={skill} />
      ))}
    </div>
  );
};

export default UserSkillsSection;
