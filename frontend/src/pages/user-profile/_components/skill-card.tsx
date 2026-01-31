import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import type { SkillType } from "@/features/profile/types";

type SkillCardProps = {
  skill: SkillType;
};

const SkillCard = ({ skill }: SkillCardProps) => {
  const { userId } = useParams();

  return (
    <Card className="w-full max-w-md shadow-lg h-60">
      <CardContent className="">
        <h2 className="text-3xl font-bold mb-4 leading-tight">{skill.skillName}</h2>
        <p className="line-clamp-3">{skill.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-end mt-auto ">
        <div className="flex items-center gap-3  ">
          {/* <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm font-medium">
            Popular
          </Badge> */}
          <Link
            to={PROTECTED_ROUTES.SCHEDULE_MEETING.replace(":userId", userId as string).replace(
              ":skillId",
              skill.skillId,
            )}
            className="bg-black text-white rounded-full size-8 flex items-center justify-center">
            <ArrowRight />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
