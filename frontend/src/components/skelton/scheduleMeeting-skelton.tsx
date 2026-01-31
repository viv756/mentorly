import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

const ScheduleMeetingSkelton = () => {
  return (
    <div className="flex items-center justify-center my-auto mx-auto">
      <div className="p-2 sm:p-0 sm:w-300 mt-15 flex sm:justify-between items-center xl:items-start gap-2 flex-col xl:flex-row ">
        <div className="p-8 border rounded-3xl sm:min-w-150 sm:max-w-150 w-full">
          <Skeleton className="h-3 w-30" />
          <div className="flex justify-between items-center pb mb-4">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-28 w-28 rounded-full" />
          </div>
          <div className="border-y h-15 flex justify-between items-center gap-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="max-w-120 sm:max-w-150 rounded-3xl">
          <Card className="p-6 border w-150 max-w-full">
            <Skeleton className="h-6 w-50" />
            <Skeleton className=" mt-10 h-6 w-50" />
            <div className="flex gap-5 justify-center">
              <Skeleton className="h-20 w-20" />
              <Skeleton className="h-20 w-20" />
              <Skeleton className="h-20 w-20" />
              <Skeleton className="h-20 w-20" />
              <Skeleton className="h-20 w-20" />
            </div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingSkelton;
