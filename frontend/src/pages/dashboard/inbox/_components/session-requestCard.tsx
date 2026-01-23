import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Target } from "lucide-react";
import DeclineSessionRequestModal from "./declineSessionRequest-modal";
import AcceptSessionRequestModal from "./acceptSession.modal";

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
        <div className="bg-linear-to-r from-secondary to-pink-100 rounded-lg p-4 mb-4 border-2 border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <Target size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">
              Wants to Learn: {session.skill.skillName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock size={12} />
              {format(new Date(session.from), "dd MMM yyyy, hh:mm a")}
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
