"use client";

import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import Button, { ButtonVariant } from "@/components/global/Button";
import { MuscleFlex } from "@/components/global/Icons";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { IExercise } from "@/types/exercise";
import { getOrdinalSuffix } from "@/utils/getOrdinalSuffix";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsLink } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import { useQuery } from "react-query";
import YouTubePlayer from "./YoutubePlayer";

type PrimaryButton = {
  value: string;
  variant: ButtonVariant;
  icon?: any;
};

export default function Workout() {
  const router = useRouter();
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
    variant: "contained",
    icon: null
  });
  const [showDoneWorkout, setShowDoneWorkout] = useState<boolean>(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState<boolean>(false);

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
    if (workout) {
      const flattenedExercises = workout.workoutDetails.exercises.reduce((acc, exercise) => {
        if (exercise.supersetExercises) {
          acc.push(...exercise.supersetExercises.map(subExercise => ({ ...subExercise, groupId: exercise._id })));
        } else if (exercise.circuitExercises) {
          acc.push(...exercise.circuitExercises.map(subExercise => ({ ...subExercise, groupId: exercise._id })));
        } else {
          acc.push({ ...exercise, groupId: exercise.id });
        }
        return acc;
      }, []);
  
      setExercises(flattenedExercises);
  
      setCurrentExercise({
        ...flattenedExercises[0],
        index: 0
      });
  
      setCurrentExerciseSet({
        ...flattenedExercises[0].sets[0],
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
        return videoId;
        // return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return '';
  };

  const videoId = getEmbeddedLink(currentExercise?.videoLink);

  const isLastExercise = () => currentExercise?.index === exercises.length - 1;

  const isLastExerciseSet = () => exercises[currentExercise.index].sets.length - 1 !== currentExerciseSet.index;

  const isExerciseDone = (exercise: IExercise) => {
    return exercise.sets.every((set: any) => set.status === "DONE");
  }

  const isExerciseSetTimeBased = () => {
    return currentExerciseSet.time && currentExerciseSet.time !== "00:00";
  }

  // tech spec for the primary action:
  // create a switch case to handle the status of an exercise's set
  // if the user clicks "End exercise" after an exercise set is done, update its set status to done.
  // then proceed to the next set.
  // if all the sets of a certain exercise is already done. Proceed with the next exercise
  // repeat
  // @TASK: handle superset and timed exercises

  const handleTimer = (
    time: string,
    onComplete: any,
    fieldName
  ) => {
    const [minutes, seconds] = time.split(":");
    const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  
    let remainingTime = totalTimeInSeconds;
  
    const countdownInterval = setInterval(() => {
      remainingTime -= 1;
  
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        onComplete();
        return;
      } else {
        const formattedTime = `${Math.floor(remainingTime / 60)
          .toString()
          .padStart(2, "0")}:${(remainingTime % 60).toString().padStart(2, "0")}`;
  
        setPrimaryButton((prev) => ({
          ...prev,
          variant: fieldName === "time" ? 'contained' : 'outlined',
          value: formattedTime,
        }));
      }
    }, 1000);
  };
  
  const handleExerciseSetTimer = () => {
    handleTimer(currentExerciseSet.time, handleRestTimer, "time");
  };
  
  const handleRestTimer = () => {
    handleTimer(currentExerciseSet.rest, handleNextExerciseSet, "rest");
  };

  // ON CLICK OF BUTTON
  const handleClickPrimaryAction = () => {
    if (!currentExerciseSet.reps) {
      throw new Error("Rep is not defined.");
    }
  
    if (primaryButton.value === "Done Workout") {
      router.back();
      return;
    }

    const checkIfTimedSet = () => {
      if (isExerciseSetTimeBased()) {
        setPrimaryButton({
          value: currentExerciseSet.time,
          icon: <LuTimer className={`${secondaryTextColor}`} />,
          variant: "contained"
        });
        return;
      } else {
        setPrimaryButton({
          value: "End set",
          variant: "danger"
        });
      }
    }

    console.log("countdown ends");
  
    switch (currentExerciseSet.status) {
      case "PENDING":
        updateExerciseSet("ONGOING", currentExerciseSet.index);
        checkIfTimedSet();
        onPlayButtonClick();
        handleExerciseSetTimer();
        return;
      case "ONGOING":
        handleNextExerciseSet();
        return;
      case "DONE":
        return;
      default:
        return;
    }
  };

  const handleNextExerciseSet = () => {
    updateExerciseSet("DONE", currentExerciseSet.index);
    
    if (isLastExercise()) {
      setShowDoneWorkout(true);
      setPrimaryButton({
        value: "Done workout",
        variant: "success",
      });
      setCurrentExercise(null);
      return;
    }

    if (isLastExerciseSet()) {
      setCurrentExerciseSet((prev: any) => ({
        ...currentExercise.sets[prev.index + 1],
        index: prev.index + 1,
      }));
    }

    if(isExerciseSetTimeBased()) {
      handleExerciseSetTimer();
      setCurrentExercise((prev: any) => ({
        ...exercises[prev.index + 1],
        index: prev.index + 1,
      }));
      setCurrentExerciseSet((prev: any) => ({
        ...exercises[currentExercise.index].sets[prev.index],
        status: "PENDING",
        index: 0,
      }));
      return;
    }

    setPrimaryButton({
      value: "Start now",
      variant: "contained"
    });
    setCurrentExercise((prev: any) => ({
      ...exercises[prev.index + 1],
      index: prev.index + 1,
    }));
    setCurrentExerciseSet((prev: any) => ({
      ...exercises[currentExercise.index].sets[prev.index],
      status: "PENDING",
      index: 0,
    }));
  };

  const updateExerciseSet = (status: string, nextIndex: number) => {
    setCurrentExerciseSet((prev: any) => ({
      ...prev,
      status,
      index: nextIndex,
    }));
    handleUpdateExercises(status);
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

  const DoneWorkout = () => {
    return (
      <div className="m-auto">
        <MuscleFlex className="m-auto"/>
        <div className="text-center">
          <div className={`${secondaryTextColor} mt-3 font-medium`}>
            Congratulations!
          </div>
          <div className={`${tertiaryTextColor} font-light`}>
            You made it to the end.
          </div>
        </div>
      </div>
    );
  };

  const [player, setPlayer] = useState<any>(null);

  const onPlayButtonClick = () => {
    if (player) {
      player.playVideo();
    }
  };

  const onPauseButtonClick = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const onSeekButtonClick = () => {
    if (player) {
      const newPosition = 60; // Seek to 60 seconds
      player.seekTo(newPosition, true);
    }
  };

  if(isLoading) {
    return <></>;
  }

  return (
    <div className={`interactive-workout-page bg-[#FFF] dark:bg-[#000] min-h-[100vh]`}>
      <div className="body w-full h-[83vh] mx-auto flex md:flex-row flex-col">
        <div className="p-3 min-w-[200px]">
          <div 
            className={`flex items-center ${tertiaryTextColor} text-[12px] gap-[5px] mb-3 w-full`}
            onClick={() => router.back()}
          >
            <AiOutlineArrowLeft />
            Exit workout
          </div>

          {currentExercise && (
            <>
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
                    {currentExercise?.instruction} {shouldPlayVideo.toString()} {videoId}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full h-full flex items-center p-3 md:p-0">
          {showDoneWorkout ? (
            <DoneWorkout />
          ) : (
            <div className="m-auto w-full h-full">
              <div className="video-wrapper">
                <div className="frame-container">
                  {videoId && (
                    <YouTubePlayer player={player} setPlayer={setPlayer} videoId={videoId} />
                  )}
                  {/* <iframe
                    width="100%"
                    height="100%"
                    className="rounded-lg md:rounded-none"
                    src={`${embeddedLink}?rel=0&controls=0&autoplay=${shouldPlayVideo ? 1 : 0}&modestbranding=1`}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe> */}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 h-full w-full md:w-[45%] overflow-y-auto overflow-x-hidden">
          <div className="title mb-2">
            <div className={`${tertiaryTextColor} text-[13px]`}>Chest Workout</div>
          </div>
          {exercises.map((exercise: IExercise, index: number) => {
            const nextExercise = exercises[index + 1];
            
            if(exercise?.groupId) {
              const isLastInGroup = !nextExercise || exercise.groupId !== nextExercise.groupId;

              return (
                <div 
                  key={index}
                  className={`${isExerciseDone(exercise) && "opacity-[0.5]"} relative p-2 w-full border relative rounded-lg ${exercise.secondaryId === currentExercise?.secondaryId ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}
                >
                  <div className={`${secondaryTextColor} text-[13px]`}>
                    {exercise.name}
                  </div>
                  <div className={`${handlePrimaryFocusColor(exercise.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
                    {exercise.primaryFocus}
                  </div>
                  {!isLastInGroup && (
                    <div className="absolute flex items-center w-full z-[500]">
                      <div className="m-auto">
                        <BsLink className={`w-5 h-5 ${secondaryTextColor}`}/>
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`${isExerciseDone(exercise) && "opacity-[0.5]"} my-4 p-2 w-full border mb-3 rounded-lg ${exercise.secondaryId === currentExercise?.secondaryId ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}
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
          <Button 
            variant={primaryButton.variant} 
            onClick={handleClickPrimaryAction}
            startIcon={primaryButton.icon}
          >
            {primaryButton.value}
          </Button>
        </div>
      </div>
    </div>
  );
}