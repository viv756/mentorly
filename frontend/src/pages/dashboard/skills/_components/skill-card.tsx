import { Briefcase, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UserSkill } from "@/features/skills/types";

type SkillCardType = {
  skill: UserSkill;
};

const SkillCard = ({ skill }: SkillCardType) => {
  return (
    <Card className="w-full max-w-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-bold">{skill.skillName}</CardTitle>
          <Badge variant="secondary" className="text-xs font-semibold">
            {skill.skillLevel}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed line-clamp-3">{skill.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm ">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="font-medium">
              {skill.category.charAt(0).toUpperCase() + skill.category.slice(1).toLowerCase()}
            </span>
          </div>
          {skill.skillType === "TEACH" && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium">{skill.experienceYears} years exp</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
