import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { MatchedUser } from "@/features/user/types";

export default function MentorCard({ user }: { user: MatchedUser }) {
  return (
    <Card className="w-full sm:max-w-sm min-h-80 ">
      <CardContent className="">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-20 h-20 rounded-md">
            <AvatarImage src={`${user.profile.avatar}`} alt="profile" className="object-cover" />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <Badge className="bg-green-500 mt-1">
              {Math.round(user.profile.rating.average * 10) / 10} ★
            </Badge>
          </div>
        </div>
        <p className="text-sm mt-2 line-clamp-4">{user.profile.bio}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {user.matchedSkills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="">
              {skill.skillName}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={`/user/${user.userId}`}>
          <Button className="">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
