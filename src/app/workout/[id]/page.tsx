"use client";

import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import { ButtonVariant } from "@/components/global/Button";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { IExercise } from "@/types/exercise";
import { secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsLink } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import { useQuery } from "react-query";
import CurrentExercise from "./CurrentExercise";
import DoneWorkoutDisplay from "./DoneWorkoutDisplay";
import ExerciseItem from "./ExerciseItem";
import FooterMenu from "./FooterMenu";
import YouTubePlayer from "./YoutubePlayer";

type PrimaryButton = {
  value: string;
  variant: ButtonVariant;
  icon?: any;
};

export default function Workout() {
  const router = useRouter();

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
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

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

  const currentExerciseSetIndexRef = useRef<number>(currentExerciseSet?.index);
  const currentExerciseSetRef = useRef<any>(currentExerciseSet);

  const videoId = getEmbeddedLink(currentExercise?.videoLink);

  const isLastExercise = () => currentExercise?.index === exercises.length - 1;

  useEffect(() => {
    currentExerciseSetIndexRef.current = currentExerciseSet?.index;
  }, [currentExerciseSet?.index]);

  useEffect(() => {
    currentExerciseSetRef.current = currentExerciseSet;
  }, [currentExerciseSet]);

  const isLastExerciseSet = () => {
    console.log("currentExerciseSet.index", currentExerciseSetIndexRef.current);
    return exercises[currentExercise.index].sets.length - 1 === currentExerciseSetIndexRef.current;
  };

  const isExerciseDone = (exercise: IExercise) => {
    return exercise.sets.every((set: any) => set.status === "DONE");
  };

  const isExerciseSetTimeBased = () => {
    return currentExerciseSetRef.current?.time && currentExerciseSetRef.current.time !== "00:00";
  };

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
    fieldName: string
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
          variant: fieldName === "rest" ? 'outlined' : 'contained',
          value: formattedTime
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
    if (primaryButton.value === "Done Workout") {
      router.back();
      return;
    }

    // console.log("currentExerciseSet123", currentExerciseSet)

    switch (currentExerciseSet.status) {
      case "PENDING":
        updateExerciseSet("ONGOING", currentExerciseSet.index);
        onPlayButtonClick();
        setIsVideoPlaying(true);
        // console.log("clicked 1")
        if(isExerciseSetTimeBased()) {
          // console.log("clicked 2")
          setPrimaryButton({
            value: currentExerciseSet.time,
            icon: <LuTimer className={`${secondaryTextColor}`} />,
            variant: "contained"
          });
          handleExerciseSetTimer();
        } else {
          // console.log("clicked 3")
          setPrimaryButton({
            value: "End set",
            variant: "danger"
          });
        }
        return;
      case "ONGOING":
        handleNextExerciseSet();
        if(isLastExercise()) {
          setPrimaryButton({
            value: "Done workout",
            variant: "success"
          });
        }
        return;
      case "DONE":
        return;
      default:
        return;
    }
  };
  
  const handleNextExerciseSet = () => {
    updateExerciseSet("DONE", currentExerciseSet.index);
  
    setCurrentExercise((prevExercise: any) => {
      const nextExerciseIndex = prevExercise.index + 1;
      
      if (!isLastExerciseSet()) {
        setCurrentExerciseSet((prevSet: any) => ({
          ...prevExercise.sets[prevSet.index + 1],
          index: prevSet.index + 1,
        }));
        
        if(isExerciseSetTimeBased()) {
          handleExerciseSetTimer();
        } else {
          setPrimaryButton({
            value: "Start now",
            variant: "contained"
          });
        }

        return {
          ...prevExercise,
          index: nextExerciseIndex
        };
      }
      
      // IT WENT TO NEXT EXERCISE BUT DIDNT START PROPERLY
      setCurrentExerciseSet((prevSet: any) => {
        console.log("exercises[prevExercise.index].sets[prevSet.index]", exercises[prevExercise.index].sets[prevSet.index])
        return {
          ...exercises[prevExercise.index].sets[prevSet.index],
          status: "PENDING",
          index: 0
        }
      });
      
      if(isExerciseSetTimeBased()) {
        console.log("TIMER here1")
        handleExerciseSetTimer();
      } else {
        console.log("no timer here1")
        setPrimaryButton({
          value: "Start now",
          variant: "contained"
        });
      }

      return {
        ...exercises[nextExerciseIndex - 1],
        index: nextExerciseIndex - 1,
      };
    });
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
            <CurrentExercise currentExercise={currentExercise} />
          )}
        </div>

        <div className="w-full h-full flex items-center p-3 md:p-0">
          {showDoneWorkout ? (
            <DoneWorkoutDisplay />
          ) : (
            <div className="m-auto w-full h-full">
              <div className="video-wrapper">
                <div className="frame-container">
                  {videoId && (
                    <>
                      <YouTubePlayer player={player} setPlayer={setPlayer} videoId={videoId} />
                    </>
                  )}
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
                <ExerciseItem
                  key={index}
                  exercise={exercise}
                  isExerciseDone={isExerciseDone}
                  currentSecondaryId={currentExercise?.secondaryId}
                >
                  {!isLastInGroup && (
                    <div className="absolute flex items-center w-full z-[500]">
                      <div className="m-auto">
                        <BsLink className={`w-5 h-5 ${secondaryTextColor}`}/>
                      </div>
                    </div>
                  )}
                </ExerciseItem>
              );
            } else {
              return (
                <ExerciseItem 
                  key={index}
                  exercise={exercise}
                  isExerciseDone={isExerciseDone}
                  currentSecondaryId={currentExercise?.secondaryId}
                />
              );
            }
          })}
        </div>
      </div>

      <FooterMenu 
        primaryButton={primaryButton}
        currentExercise={currentExercise}
        currentExerciseSet={currentExerciseSet}
        currentExerciseSetRef={currentExerciseSetRef}
        isExerciseSetTimeBased={isExerciseSetTimeBased}
        handleClickPrimaryAction={handleClickPrimaryAction}
        setPrimaryButton={setPrimaryButton}
        updateExerciseSet={updateExerciseSet}
        exercises={exercises}
        setCurrentExercise={setCurrentExercise}
        setCurrentExerciseSet={setCurrentExerciseSet}
        isLastExerciseSet={isLastExerciseSet}
      />
    </div>
  );
};