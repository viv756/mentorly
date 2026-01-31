import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileSkelton = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen w-full">
      <aside className="flex sm:h-screen sm:min-w-120 sm:max-w-120 flex-col  sm:pl-9 pl-5 py-9">
        <Skeleton className="h-50 w-50 rounded-full" />
        <Skeleton className="h-5 w-80 mt-7" />
        <div className="flex flex-col gap-2 mt-4 ">
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
        </div>
        <div className="mt-auto hidden sm:block">
          <Skeleton className="h-3 w-50" />
        </div>
      </aside>
      <main className="flex-1 p-8 h-svh">
        <Skeleton className="h-4 max-w-140 mt-5" />
        <div className="mt-10 flex flex-wrap gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="w-full max-w-md  h-60">
              <CardHeader>
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Skeleton className="h-18 w-18 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserProfileSkelton;
