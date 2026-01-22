import type { SkillType } from "@/features/profile/types";
import SkillCard from "./skill-card";

type SkillCardSectionProps = {
  skills: SkillType[];
};

export default function SkillCardSection({ skills }: SkillCardSectionProps) {
  return (
    <div className="flex flex-wrap gap-5">
      {skills.map((skill) => (
        <SkillCard key={skill.skillId} skill={skill} />
      ))}
    </div>
  );
}
