import { BrainCog } from "lucide-react";
import type { UserSkill } from "@/features/skills/types";
import SkillCard from "./skill-card";
import type { SKILL_ENUM_TYPE } from "@/constant";

type UserSkillsSectionProps = {
  skills: UserSkill[];
  type: SKILL_ENUM_TYPE;
};

const UserSkillsSection = ({ skills }: UserSkillsSectionProps) => {
  if (skills.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center mt-30 ">
        <div className="flex flex-col items-center justify-center">
          <BrainCog size={40} />
          <h1 className="text-3xl font-bold">Add skills to show</h1>
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
