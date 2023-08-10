"use client";

import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import Button from "@/components/global/Button";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { IExercise } from "@/types/exercise";
import { borderColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Workout() {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<IExercise>(
    // @ts-ignore
    null
  );

  const { 
    data: workout,
    isLoading
  } = useQuery(
    'calendarSchedules',
    async () => {
      const data = await listWeeklyCalendarSchedules(JSON.stringify([new Date().toLocaleDateString()]));
      return data[0];
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: true
    }
  );
  
  useEffect(() => {
    if(workout) {
      setExercises(workout.workoutDetails.exercises);
      setCurrentExercise(workout.workoutDetails.exercises[0]);
    }
  }, [workout]);

  if(isLoading) {
    return <></>;
  }

  const getEmbeddedLink = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\/([^?/#&]+)/;
    if (youtubeRegex.test(url)) {
      const videoIdMatch = url.match(youtubeRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        const videoId = videoIdMatch[4];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }
    return '';
  };

  const embeddedLink = getEmbeddedLink(currentExercise?.videoLink);

  return (
    <div className={`interactive-workout-page`}>
      <div className="body w-full h-[80vh] mx-auto flex md:flex-row flex-col">
        <div className="p-3">
          <div className={`text-[14px] font-semibold ${secondaryTextColor}`}>
            {currentExercise?.name}
          </div>
          <div className={`${handlePrimaryFocusColor(currentExercise?.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
            {currentExercise?.primaryFocus}
          </div>
          <div className="coach-instructions flex flex-col gap-[5px] mt-7">
            <div className="-mb-4">
              <div className="w-[45px] h-[45px] rounded-full relative overflow-hidden">
                <Image 
                  src={localStorage.getItem("thumbnailImage") || "/"}
                  fill
                  alt="Trainer Image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={`${secondaryTextColor} font-light text-[14px] rounded-xl p-3 w-fit dark:bg-neutral-50 bg-neutral-200`}>
              <div className="text-neutral-950 w-[150px] mt-1 text-[12px]">
                {currentExercise?.instruction}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex items-center p-3 md:p-0">
          <div className="flex gap-[50px] m-auto w-full h-full">
            <iframe
              width="100%"
              height="100%"
              className="rounded-lg md:rounded-none"
              src={embeddedLink}
              title="YouTube Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="p-3 h-full w-full md:w-[45%] overflow-y-auto overflow-x-hidden">
          <div className="title mb-2">
            <div className={`${tertiaryTextColor} text-[13px]`}>Chest Workout</div>
          </div>
          {exercises.map((exercise: IExercise, index: number) => (
            <div 
              key={index} 
              className={`p-2 w-full border mb-2 rounded-lg ${exercise._id === currentExercise?._id ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}
              onClick={() => {
                setCurrentExercise(exercise);
              }}
            >
              <div className={`${secondaryTextColor} text-[13px]`}>
                {exercise.name}
              </div>
              <div className={`${handlePrimaryFocusColor(exercise.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
                {exercise.primaryFocus}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`actionbar border-t w-full ${borderColor} bg-[#131313] m-auto fixed bottom-0 md:left-0 md:right-0`}>
        <div className="flex items-center justify-between px-5 py-3 h-full">
          <div className="col-1">
            <div className={`text-neutral-400 text-[12px]`}>
              Next workout:
            </div>
            <div className={`text-neutral-200 text-[14px] md:text-[16px]`}>
              Incline Bench Press
            </div>
          </div>
          <Button variant="contained">
            Start 1st set
          </Button>
        </div>
      </div>
    </div>
  );
}