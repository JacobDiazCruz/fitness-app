"use client";

import Button, { ButtonVariant } from "@/components/global/Button";
import { IExercise } from "@/types/exercise";
import { secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsLink } from "react-icons/bs";
import CurrentExercise from "./CurrentExercise";
import DoneWorkoutDisplay from "./DoneWorkoutDisplay";
import ExerciseItem from "./ExerciseItem";
import FooterMenu from "./FooterMenu";
import useExercises from "./hooks/useExercises";
import useExerciseVideo from "./hooks/useExerciseVideo";
import YouTubePlayer from "./YoutubePlayer";

type PrimaryButton = {
  value: string;
  variant: ButtonVariant;
  icon?: any;
};

export default function Workout() {
  const router = useRouter();

  const {
    exercises,
    currentExercise,
    setCurrentExercise,
    currentExerciseSet,
    setCurrentExerciseSet,
    isLastExercise,
    isLastExerciseSet,
    isLoading,
    isExerciseDone,
    isExerciseSetTimeBased,
    updateExerciseSet
  } = useExercises();

  const {
    player,
    setPlayer,
    videoId,
    onPlayVideo,
    onPauseVideo
  } = useExerciseVideo({ currentExercise });

  const [primaryButton, setPrimaryButton] = useState<PrimaryButton>({
    value: "Start now",
    variant: "contained",
    icon: null
  });
  const [showDoneWorkout, setShowDoneWorkout] = useState<boolean>(false);
  
  const [isExercisePlaying, setIsExercisePlaying] = useState<boolean>(false);
  const [isRestPlaying, setIsRestPlaying] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<any>("");

  // play the next exercise video for timed based exercise
  useEffect(() => {
    if(isExerciseSetTimeBased()) {
      if (isExercisePlaying && videoId && player) {
        setTimeout(() => {
          onPlayVideo();
        }, 50);
      }
    }
  }, [isExercisePlaying, videoId, player]);

  // ON CLICK OF BUTTON
  const handleClickPrimaryAction = () => {
    if (primaryButton.value === "Done Workout") {
      router.back();
      return;
    }
    
    switch (currentExerciseSet.status) {
      case "PENDING":
        updateExerciseSet("ONGOING", currentExerciseSet.index);
        onPlayVideo();
        setIsExercisePlaying(true);
        setPrimaryButton({
          value: "End set",
          variant: "danger"
        });
        return;
      case "ONGOING":
        if(isLastExercise()) {
          setPrimaryButton({
            value: "Done workout",
            variant: "success"
          });
          return;
        }
        handleNextExerciseSet();
        setIsExercisePlaying(false);
        return;
      case "DONE":
        return;
      default:
        return;
    }
  };

  // if rest is playing, pause video
  useEffect(() => {
    if(videoId && isRestPlaying) {
      onPauseVideo();
    }
  }, [isRestPlaying]);

  useEffect(() => {
    if(!isExerciseSetTimeBased()) {
      setPrimaryButton({
        value: "Start now",
        variant: "contained"
      });
    }
  }, [currentExercise]);
  
  const handleNextExerciseSet = () => {
    updateExerciseSet("DONE", currentExerciseSet.index);
  
    setCurrentExercise((prevExercise: any) => {
      const nextExerciseIndex = prevExercise.index + 1;
      
      if (!isLastExerciseSet()) {
        setCurrentExerciseSet((prevSet: any) => ({
          ...prevExercise.sets[prevSet.index + 1],
          index: prevSet.index + 1,
        }));
        
        setPrimaryButton({
          value: "Start now",
          variant: "contained"
        });
      }
            
      setCurrentExerciseSet((prevSet: any) => {
        return {
          ...exercises[prevExercise.index].sets[prevSet.index],
          status: "PENDING",
          index: 0
        }
      });

      setPrimaryButton({
        value: "Start now",
        variant: "contained"
      });

      return {
        ...exercises[nextExerciseIndex],
        index: nextExerciseIndex,
      };
    });
  };

  const handleDoneWorkout = () => {
    setPrimaryButton({
      value: "Done workout",
      variant: "success"
    });
    setShowDoneWorkout(true);
  };

  if(isLoading) {
    return <></>;
  }

  return (
    <div className={`interactive-workout-page bg-[#FFF] dark:bg-[#000] min-h-[100vh]`}>
      <div className="body w-full h-[83vh] mx-auto flex md:flex-row flex-col">
        {/* Left view */}
        <div className="p-3 min-w-[200px]">
          <div 
            className={`flex items-center ${tertiaryTextColor} text-[12px] gap-[5px] mb-3 w-full`}
            onClick={() => router.back()}
          >
            <AiOutlineArrowLeft />
            Exit workout
          </div>

          {(currentExercise && !showDoneWorkout) && (
            <CurrentExercise currentExercise={currentExercise} />
          )}
        </div>
        
        {/* Center view */}
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
        
        {/* Right view */}
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
        currentExercise={currentExercise}
        currentExerciseSet={currentExerciseSet}
        updateExerciseSet={updateExerciseSet}
        exercises={exercises}
        isExercisePlaying={isExercisePlaying}
        isRestPlaying={isRestPlaying}
        setIsExercisePlaying={setIsExercisePlaying}
        setIsRestPlaying={setIsRestPlaying}
        setCurrentExercise={setCurrentExercise}
        setCurrentExerciseSet={setCurrentExerciseSet}
        currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer}
        handleDoneWorkout={handleDoneWorkout}
        primaryAction={
          <Button
            variant={primaryButton.variant}
            onClick={handleClickPrimaryAction}
            startIcon={primaryButton.icon}
          >
            {primaryButton.value}
          </Button>
        }
      />
    </div>
  );
};