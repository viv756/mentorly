import { Skeleton } from "@/components/ui/skeleton";

const UpdateProfileFormSkelton = () => {
  return  <div className="w-full max-w-xl">
        <div className="mt-10">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-30" />
            <Skeleton className="h-3 w-70" />
          </div>
          <div className="mt-10 flex justify-between items-center">
            <Skeleton className="h-30 w-30" />
            <Skeleton className="h-3 w-25" />
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
};

export default UpdateProfileFormSkelton;
