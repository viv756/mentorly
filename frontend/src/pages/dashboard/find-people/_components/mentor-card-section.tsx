import MentorCard from "@/components/mento-card";
import { useGetFindPeople } from "@/hooks/api/user/use-find-people";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MatchedUser } from "@/features/user/types";

const MentorCardSection = () => {
  const { data, isLoading } = useGetFindPeople();

  if (isLoading || !data) {
    return (
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card className="w-full max-w-sm min-h-80" key={i}>
            <CardContent className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Skeleton className="h-20 w-20" />
                <div className="flex flex-col gap-2 mt-2">
                  <Skeleton className="h-3 w-25" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Skeleton className="h-9 w-30" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  const users = data.users;

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map((user: MatchedUser) => (
        <MentorCard key={user.userId} user={user} />
      ))}
    </div>
  );
};

export default MentorCardSection;
