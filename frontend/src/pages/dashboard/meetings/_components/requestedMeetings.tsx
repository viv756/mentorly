import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Clock, User, Target, Send, AlertCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RequestedType } from "@/features/session/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";

type RequestedMeetingsProps = {
  requested: RequestedType | [];
};

export default function RequestedMeetings({ requested }: RequestedMeetingsProps) {
  return (
    <>
      {/* Requests List */}
      <div>
        {requested.length === 0 ? (
          <CardContent className="p-12 text-center">
            <Send className="mx-auto text-muted-foreground mb-4" size={64} />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No requests yet</h3>
            <p className="text-muted-foreground mb-4">
              Start your learning journey by requesting a session with a mentor!
            </p>
            <Link to={PROTECTED_ROUTES.FIND_PEOPLE}>
              <Button className="gap-2">
                <User size={18} />
                Find a Mentor
              </Button>
            </Link>
          </CardContent>
        ) : ( 
          <div className=" grid lg:grid-cols-2 gap-3">
            {requested.map((session) => ( 
              <Card
                key={session._id}
                className="hover:shadow-lg transition-shadow border-l-4 border-l-primary w-full sm:max-w-xl">
                <CardContent className="">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1 items-center">
                        {/* Mentor Avatar */}
                        <Avatar className="w-16 h-16 border-2 border-primary/20 rounded-lg ">
                          <AvatarImage
                            src={session.mentor.profile.avatar}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-lg">MM</AvatarFallback>
                        </Avatar>

                        {/* Mentor Info */}
                        <h3 className="text-xl font-bold text-foreground">{session.mentor.name}</h3>
                      </div>
                    </div>

                    {/* Skill Requested Section */}
                    <div className="">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-primary" />
                        <span className="font-bold text-primary">
                          Learning: {session.skill.skillName}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span>{format(session.scheduledAt, "dd-mm-yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-muted-foreground" />
                          <span>{format(session.from, "hh:mm a")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={20} className="text-orange-600" />
                        <span className="text-sm text-orange-900">
                          Waiting for mentor's response... Sent{" "}
                          {formatDistanceToNow(session.createdAt, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Time Info */}

                    {/* Actions */}
                    <CardFooter className="mt-auto flex justify-end ">
                      <Button
                        variant="ghost"
                        size="sm"
                        // onClick={() => handleCancel(request.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={16} className="mr-1" />
                        Cancel
                      </Button>
                    </CardFooter>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export const RequestedMeetingsSkelton = () => {
  return (
    <div className="space-y-4 grid sm:grid-cols-2 gap-3 mt-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="sm:max-w-xl max-w-sm max-h-76">
          <CardHeader className="flex items-center gap-3">
            <Skeleton className="h-20 w-20" />
            <Skeleton className="h-3 w-30" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-3 w-70" />
            <div className="flex justify-between mt-5 border-y p-6">
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-3 w-30" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end ">
            <Skeleton className="h-10 w-35" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
