import { Briefcase, Clock } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UserSkill } from "@/features/skills/types";
import { formatWord } from "@/lib/helper";
import { Skeleton } from "@/components/ui/skeleton";

type SkillCardType = {
  skill: UserSkill;
};

const SkillCard = ({ skill }: SkillCardType) => {
  return (
    <Card className="w-full sm:max-w-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{skill.skillName}</CardTitle>
          <Badge variant="secondary" className="text-xs font-semibold">
            {skill.skillLevel} 
          </Badge>
        </div>
        {/* <CardDescription className="text-sm leading-relaxed line-clamp-3">
          {skill.description}
        </CardDescription> */}
      </CardHeader>
      <CardFooter className="mt-auto">
        <div className="flex items-center gap-4 text-sm ">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{formatWord(skill.category)}</span>
          </div>
          {skill.skillType === "TEACH" && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium">{skill.experienceYears} years exp</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;

export const SkillCardSkelton = () => {
  return (
    <Card className="w-full sm:max-w-md h-38">
      <CardHeader className="flex justify-between items-center">
        <Skeleton className="h-3 w-50" />
        <Skeleton className="h-4  w-20" />
      </CardHeader>
      <CardFooter className="flex gap-3 items-center mt-auto ">
        <Skeleton className="h-3 w-30 " />
        <Skeleton className="h-3 w-30" />
      </CardFooter>
    </Card>
  );
};
