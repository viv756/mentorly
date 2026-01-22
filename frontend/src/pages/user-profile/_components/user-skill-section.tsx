import SkillCard from "./skill-card";

export default function SkillCardSection({ skills }) {
  return (
    <div className="flex flex-wrap gap-5">
      {skills.map((skill) => (
        <SkillCard key={skill.skillId} skill={skill} />
      ))}
    </div>
  );
}
