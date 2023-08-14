"use client";

import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import Button, { ButtonVariant } from "@/components/global/Button";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { IExercise } from "@/types/exercise";
import { getOrdinalSuffix } from "@/utils/getOrdinalSuffix";
import { borderColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsLink } from "react-icons/bs";
import { useQuery } from "react-query";

type PrimaryButton = {
  value: string;
  variant: ButtonVariant;
};

export default function Workout() {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<any>(
    // @ts-ignore
    null
  );
  const [currentExerciseSet, setCurrentExerciseSet] = useState<any>(
    // @ts-ignore
    null
  );
  const [primaryButton, setPrimaryButton] = useState<PrimaryButton>({
    value: "Start now",
    variant: "contained"
  });

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
      setCurrentExercise({
        ...workout.workoutDetails.exercises[0],
        index: 0
      });
      setCurrentExerciseSet({
        ...workout.workoutDetails.exercises[0].sets[0],
        index: 0
      });
    }
  }, [workout]);

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

  // tech spec for the primary action:
  // create a switch case to handle the status of an exercise's set
  // if the user clicks "End exercise" after an exercise set is done, update its set status to done.
  // then proceed to the next set.
  // if all the sets of a certain exercise is already done. Proceed with the next exercise
  // repeat
  // @TASK: handle superset and timed exercises
  const handleClickPrimaryAction = () => {
    console.log("currentExerciseSet", currentExerciseSet)
    if(!currentExerciseSet.reps) return;
    switch(currentExerciseSet.status) {
      case "PENDING":
        setCurrentExerciseSet((prev: any) => ({
          ...prev,
          status: "ONGOING"
        }));
        setPrimaryButton({
          value: "End set",
          variant: "danger"
        });
        handleUpdateExercises("ONGOING");
        return;
      case "ONGOING":
        setCurrentExerciseSet((prev: any) => ({
          ...prev,
          status: "DONE"
        }));
        handleUpdateExercises("DONE");

        if(currentExercise.index === exercises.length - 1) {
          setPrimaryButton({
            value: "Done workout",
            variant: "success"
          });
        } else {
          setPrimaryButton({
            value: "Start now",
            variant: "contained"
          });
        }

        if(exercises[currentExercise.index].sets.length - 1 !== currentExerciseSet.index) {
          setCurrentExerciseSet((prev: any) => {
            return {
              ...currentExercise.sets[prev.index + 1],
              index: prev.index + 1
            }
          });
        } else {
          setCurrentExercise((prev: any) => {
            return {
              ...exercises[prev.index + 1],
              index: prev.index + 1
            }
          });
          setCurrentExerciseSet((prev: any) => {
            return {
              ...exercises[currentExercise.index].sets[prev.index],
              status: "PENDING",
              index: 0
            }
          });
        }

        return;
      case "DONE":
        return;
      default:
        return;
    };
  };

  const handleUpdateExercises = (status: string) => {
    const updatedExercises = exercises.map((exercise: any) => {
      if (exercise.secondaryId === currentExercise.secondaryId) {
        return {
          ...exercise,
          sets: exercise.sets.map((set: any, index: number) => {
            if (index === currentExerciseSet.index) {
              return {
                ...set,
                status
              };
            }
            return set;
          })
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);
  };

  if(isLoading) {
    return <></>;
  }

  return (
    <div className={`interactive-workout-page bg-[#FFF] dark:bg-[#000] min-h-[100vh]`}>
      <div className="body w-full h-[83vh] mx-auto flex md:flex-row flex-col">
        <div className="p-3">
          <div className={`flex items-center ${tertiaryTextColor} text-[12px] gap-[5px] mb-3`}>
            <AiOutlineArrowLeft />
            Exit workout
          </div>
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
          {exercises.map((exercise: IExercise, index: number) => {
            if(exercise.supersetExercises?.length) {
              return (
                <div className="my-3">
                  {exercise.supersetExercises.map((supersetExercise: any, superindex: number) => (
                    <div 
                      key={superindex}
                      className={`p-2 w-full border relative rounded-lg ${exercise.secondaryId === currentExercise?.secondaryId ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}
                      onClick={() => {
                        setCurrentExercise(exercise);
                      }}
                    >
                      <div className={`${secondaryTextColor} text-[13px]`}>
                        {supersetExercise.name}
                      </div>
                      <div className={`${handlePrimaryFocusColor(supersetExercise.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
                        {supersetExercise.primaryFocus}
                      </div>
                      {exercise.supersetExercises.length - 1 !== superindex && (
                        <div className="absolute flex items-center w-full">
                          <div className="m-auto">
                            <BsLink className={`w-5 h-5 ${secondaryTextColor}`}/>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div 
                  key={index} 
                  className={`p-2 w-full border mb-3 rounded-lg ${exercise.secondaryId === currentExercise?.secondaryId ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}
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
              );
            }
          })}
        </div>
      </div>

      <div className={`actionbar border-t w-full ${borderColor} bg-[#131313] m-auto fixed bottom-0 md:left-0 md:right-0`}>
        <div className="flex items-center justify-between px-5 py-3 h-full">
          <div className="col-1">
            <div className={`text-neutral-400 text-[12px]`}>
              exercise:
            </div>
            <div className={`text-neutral-200 text-[14px] md:text-[16px]`}>
              {currentExercise?.name}
            </div>
          </div>
          <div className={`sets flex gap-[40px] w-fit`}>
            <div>
              <div className={`${secondaryTextColor} text-[14px]`}>Set</div>
              <div className={`${tertiaryTextColor} text-[14px]`}>{currentExerciseSet?.index + 1}</div>
            </div>
            <div>
              <div className={`${secondaryTextColor} text-[14px]`}>Reps</div>
              <div className={`${tertiaryTextColor} text-[14px]`}>7-10</div>
            </div>
          </div>
          <Button variant={primaryButton.variant} onClick={handleClickPrimaryAction}>
            {primaryButton.value}
          </Button>
        </div>
      </div>
    </div>
  );
}