import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/global/Icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Props {
  weeks: Array<any>;
}

export default function WeeksPagination({ weeks }: Props) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentWeek = searchParams?.get('week');
  const [startIndex, setStartIndex] = useState(0);

  const handleClickNext = () => {
    const nextIndex = startIndex + 4;
    if (nextIndex < weeks.length) {
      setStartIndex(nextIndex);
    }
  };

  const handleClickPrev = () => {
    const prevIndex = startIndex - 4;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const activeWeekStyle = (index: any) => {
    if(currentWeek == startIndex + index + 1) {
      return 'dark:border-green-500 border-green-300 dark:bg-green-950 bg-green-50 dark:text-green-500 text-green-500';
    } else {
      return 'dark:border-neutral-700 dark:text-neutral-400';
    }
  };

  return (
    <div className="weeks-pagination flex gap-[25px] items-center justify-between max:w-[320px]">
      <h5 className="dark:text-neutral-50 text-darkTheme-950 font-medium text-[14px]">
        Week {currentWeek} 
        <span className="dark:text-neutral-500 text-neutral-700">
          of {weeks?.length}
        </span>
      </h5>
      <div className="flex items-center gap-[10px]">
        <div
          className="dark:bg-darkTheme-950 dark:border dark:border-solid dark:border-neutral-700 dark:text-neutral-50 bg-white cursor-pointer shadow-md flex items-center py-1 h-[29px] w-[28px] rounded-md"
          onClick={handleClickPrev}
        >
          <ChevronLeftIcon className="w-4 h-4 m-auto" />
        </div>
        {weeks?.slice(startIndex, startIndex + 4).map((week, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/manager/programs/edit/${params.id}?week=${startIndex + index + 1}`);
            }}
            className={`
              ${activeWeekStyle(index)}
              dark:bg-darkTheme-950 dark:border dark:border-solid border
              bg-white cursor-pointer shadow-md py-1 px-2 h-[29px] min-w-[28px] text-[14px] text-center rounded-md`}
          >
            {startIndex + index + 1}
          </div>
        ))}
        <div
          className="dark:bg-darkTheme-950 dark:border dark:border-solid dark:border-neutral-700 dark:text-neutral-50 bg-white cursor-pointer shadow-md flex items-center py-1 h-[29px] w-[28px] rounded-md"
          onClick={handleClickNext}
        >
          <ChevronRightIcon className="w-4 h-4 m-auto" />
        </div>
      </div>
    </div>
  );
};