import { Link } from "react-router-dom";
import { differenceInHours, format } from "date-fns";
import { Video, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UpcomingType } from "@/features/session/types";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";

type UpcomingMeetingsProps = {
  upcoming: UpcomingType | [];
};

export default function UpcomingMeetings({ upcoming }: UpcomingMeetingsProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      {/* Meetings List */}
      <div>
        {upcoming.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="mx-auto text-muted-foreground mb-4" size={64} />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No upcoming meetings
            </h3>
            <p className="text-muted-foreground">
              Your schedule is clear. New meetings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4 grid sm:grid-cols-2 ">
            {upcoming.map((session) => (
              <Card
                key={session._id}
                className="hover:shadow-lg transition-shadow border-l-4 border-l-primary max-w-xl ">
                <CardContent className="">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {session.skill.skillName}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-1 ">
                          {session.skill.description}
                        </p>
                      </div>
                      <span className="flex justify-between items-center">
                        {user && user.userId === session.mentor._id && (
                          <Badge variant={"secondary"}>Lead the Session</Badge>
                        )}
                        <Video className="text-primary shrink-0 ml-4" size={28} />
                      </span>
                    </div>

                    {/* Meeting Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground" size={18} />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="font-semibold text-sm">
                            {format(session.scheduledAt, "dd-mm-yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground" size={18} />
                        <div className="">
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="font-semibold text-sm ">{format(session.from, "hh:mm")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground" size={18} />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-semibold text-sm">
                            {differenceInHours(session.to, session.from)} hours
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Organizer and Participants */}
                    <div className="space-y-3">
                      {/* Organizer */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {user && user.userId === session.mentor._id ? (
                            <>
                              <Avatar className="w-8 h-8 ">
                                <AvatarImage
                                  src={session.learner.profile.avatar}
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-xs bg-primary text-white">
                                  AA
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{session.learner.name}</span>
                            </>
                          ) : (
                            <>
                              <Avatar className="w-8 h-8 ">
                                <AvatarImage
                                  src={session.mentor.profile.avatar}
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-xs bg-primary text-white">
                                  AA
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{session.mentor.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2 justify-end">
                      <Link
                        to={PROTECTED_ROUTES.VIDEO_CALL.replace(":sessionId", `${session._id}`)}>
                        <Button className="">
                          <Video size={18} />
                          Join Meeting
                        </Button>
                      </Link>
                    </div>
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

export const UpcomingMeetingsSkelton = () => {
  return (
    <div className="space-y-4 grid sm:grid-cols-2 gap-3 mt-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="max-w-xl max-h-75">
          <CardHeader className="">
            <div className="flex  justify-between">
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-3 w-30" />
            </div>
            <Skeleton className="h-3 w-full mt-2 " />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mt-1 border-y p-6">
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-3 w-30" />
              <Skeleton className="h-3 w-30" />
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton className="h-10 w-10 rounded-full mt-5" />
              <Skeleton className="h-3 w-30  mt-5" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end  ">
            <Skeleton className="h-10 w-35" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
