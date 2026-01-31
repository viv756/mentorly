import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

const ScheduleMeetingSkelton = () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          {/* Left Card - Skill Details Skeleton */}
          <div className="w-full xl:w-1/2">
            <div className="p-4 sm:p-6 md:p-8 border rounded-2xl sm:rounded-3xl w-full">
              <Skeleton className="h-3 w-30 mb-4" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <Skeleton className="h-4 w-50" />
                <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full shrink-0" />
              </div>

              <div className="border-y py-3 sm:py-4 mb-4 sm:mb-6 space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-center gap-4">
                <Skeleton className="h-3 w-full sm:w-auto sm:flex-1" />
                <Skeleton className="h-3 w-full sm:w-auto sm:flex-1" />
                <Skeleton className="h-3 w-full sm:w-auto sm:flex-1" />
              </div>

              <div className="flex flex-col gap-2 mt-5">
                {Array.from({ length: 18 }).map((_, index) => (
                  <Skeleton key={index} className="h-3 w-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Card - Schedule Form Skeleton */}
          <div className="w-full xl:w-1/2">
            <Card className="p-4 sm:p-6 border rounded-2xl sm:rounded-3xl w-full">
              <Skeleton className="h-5 sm:h-6 w-40 sm:w-50 mb-6 sm:mb-10" />

              <Skeleton className="h-4 sm:h-6 w-32 sm:w-50 mb-3" />

              <div className="flex gap-2 sm:gap-3 justify-center mb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg sm:rounded-xl shrink-0"
                  />
                ))}
              </div>

              <Skeleton className="h-3 w-32 sm:w-40 mb-3" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 sm:h-12 w-full" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingSkelton;
