import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Target } from "lucide-react";
import DeclineSessionRequestModal from "./declineSessionRequest-modal";
import AcceptSessionRequestModal from "./acceptSession.modal";
import { Skeleton } from "@/components/ui/skeleton";

const SessionRequestCard = ({ session }) => {
  return (
    <Card className="max-w-xl">
      <CardHeader className="flex items-center gap-3">
        <Avatar className="w-20 h-20">
          <AvatarImage src={session.learner.profile.avatar} className=" object-cover " />
        </Avatar>
        <div className="">
          <p>{session.learner.name}</p>
          <p className="text-sm text-muted-foreground ">
            {formatDistanceToNow(new Date(session.createdAt), {
              addSuffix: true,
            })}
          </p>
          <p className="text-sm line-clamp-2 mt-1">{session.learner.profile.bio}</p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Skill Requested - Highlighted */}
        <div className="bg-gradient-to-r from-secondary to-red-100 dark:from-secondary-white dark:to-red-300 rounded-lg p-4 mb-4 border-2 border-secondary dark:border-secondary-dark">
          <div className="flex items-center gap-2 mb-2">
            <Target size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">
              Wants to Learn: {session.skill.skillName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock size={12} />
              {format(session.scheduledAt, "dd MMM yyyy, hh:mm a")}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <DeclineSessionRequestModal />
        <AcceptSessionRequestModal sessionId={session._id} learnerId={session.learner._id} />
      </CardFooter>
    </Card>
  );
};

export default SessionRequestCard;

export const SessionRequestSkelton = () => {
  return (
    <Card className="max-w-xl">
      <CardHeader className="flex items-center gap-3">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className=" flex flex-col gap-2">
          <Skeleton className="h-3 w-50 " />
          <Skeleton className="h-3 w-50 " />
          <Skeleton className="h-3 w-90   " />
          <Skeleton className="h-3 w-90   " />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20  w-full" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex gap-3">
          <Skeleton className="w-28  h-9  " />
          <Skeleton className="w-28  h-9  " />
        </div>
      </CardFooter>
    </Card>
  );
};
