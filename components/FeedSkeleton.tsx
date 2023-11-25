import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FeedSkeleton = () => {
  return (
    <div className="col-span-6 my-2 flex h-52 flex-col justify-between rounded-xl  bg-white p-4 dark:bg-muted/50">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-muted" />
          <Skeleton className="h-4 lg:w-[350px]" />
        </div>
        <Skeleton className="h-4 lg:w-[100px]" />
      </div>
      <Skeleton className="ml-14 h-8 lg:w-[650px]" />
      <Skeleton className="ml-14 h-8 lg:w-[650px]" />
      <Skeleton className="ml-14 h-8 lg:w-[650px]" />
    </div>
  );
};

export default FeedSkeleton;
