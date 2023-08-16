import Button from "@/components/global/Button";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { convertTimerToSeconds } from "@/utils/converTimerToSeconds";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useEffect, useState } from "react";

export default function FooterMenu({
  primaryButton,
  currentExercise,
  currentExerciseSet,
  handleClickPrimaryAction,
  isExerciseSetTimeBased,
  setPrimaryButton,
  updateExerciseSet,
  exercises,
  setCurrentExercise,
  setCurrentExerciseSet
}: any) {
  const playtimerInSeconds = convertTimerToSeconds(currentExerciseSet?.time || "");
  const restTimerInSeconds = convertTimerToSeconds(currentExerciseSet?.rest || "");
  
  const [isExercisePlaying, setIsExercisePlaying] = useState<boolean>(true);
  const [isRestPlaying, setIsRestPlaying] = useState<boolean>(false);

  const [currentTimer, setCurrentTimer] = useState<any>("");

  useEffect(() => {
    setCurrentTimer(playtimerInSeconds);
  }, [playtimerInSeconds]);

  const isLastExerciseSet = () => {
    return exercises[currentExercise.index].sets.length - 1 == currentExerciseSet.index;
  }

  const handleNextTimedExercise = () => {
    updateExerciseSet("DONE", currentExerciseSet.index);

    setCurrentExercise((prevExercise: any) => {
      const nextExerciseIndex = prevExercise.index + 1;

      if (isLastExerciseSet()) {
        // next exercise set to play
        setCurrentExerciseSet(() => {
          return {
            ...exercises[prevExercise.index].sets[0],
            status: "PENDING",
            index: 0
          }
        });
        setIsExercisePlaying(true);

        // return next exercise
        return {
          ...exercises[nextExerciseIndex],
          index: nextExerciseIndex
        };
      }

      setIsExercisePlaying(true);
      
      // go to next exercise set
      setCurrentExerciseSet((prevSet: any) => ({
        ...prevExercise.sets[prevSet.index + 1],
        index: prevSet.index + 1,
      }));

      return prevExercise;
    });
  };

  return (
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
          {isExerciseSetTimeBased() ? (
            <>
              {isExercisePlaying && (
                <div className={`flex items-center gap-[10px] ${secondaryTextColor}`}>
                  <div>Workout {currentExerciseSet.index + 1}</div>
                  <CountdownCircleTimer
                    isPlaying={isExercisePlaying}
                    duration={parseInt(currentTimer)}
                    size={60}
                    strokeWidth={4}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={() => {
                      setCurrentTimer(restTimerInSeconds);
                      setIsExercisePlaying(false);
                      setIsRestPlaying(true);
                    }}
                  >
                    {({ remainingTime }) => <p className={`${primaryTextColor} text-[16px]`}>{remainingTime}</p> }
                  </CountdownCircleTimer>
                </div>
              )}
              {isRestPlaying && (
                <div className={`flex items-center gap-[10px] ${secondaryTextColor}`}>
                  <div>Rest {currentExerciseSet.index + 1}</div>
                  <CountdownCircleTimer
                    isPlaying={isRestPlaying}
                    duration={parseInt(currentTimer)}
                    size={60}
                    strokeWidth={4}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={() => {
                      handleNextTimedExercise();
                      setIsRestPlaying(false);
                    }}
                  >
                    {({ remainingTime }) => <p className={`${primaryTextColor} text-[16px]`}>{remainingTime}</p> }
                  </CountdownCircleTimer>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <div className={`${secondaryTextColor} text-[14px]`}>Set</div>
                <div className={`${tertiaryTextColor} text-[14px]`}>{currentExerciseSet?.index + 1}</div>
              </div>
              <div>
                <div className={`${secondaryTextColor} text-[14px]`}>Reps</div>
                <div className={`${tertiaryTextColor} text-[14px]`}>7-10</div>
              </div>
            </>
          )}
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
  );
};