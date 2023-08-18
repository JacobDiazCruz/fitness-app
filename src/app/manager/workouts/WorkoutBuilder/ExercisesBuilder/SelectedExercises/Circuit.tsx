import React, { ReactNode, useState } from "react";
import Button from "@/components/global/Button";
import { CubeTransparentIcon, HookIcon, ViewFinderIcon } from "@/components/global/Icons";
import useWorkout from "@/store/Workout/useWorkout";
import IconButton from "@/components/global/IconButton";
import { WorkoutContext } from "@/utils/workoutTypes";
import Tooltip from "@/components/global/Tooltip";
import TextField from "@/components/global/TextField";
import FieldName from "@/components/global/FieldName";
import { secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import useSelectedExerciseController from "@/hooks/workouts/useSelectedExerciseController";

export default function Circuit({
  children,
  exerciseSecondaryId = "",
  exerciseIndex
}: {
  children: ReactNode;
  exerciseSecondaryId?: string;
  exerciseIndex: number;
}) {
  const { state } = useWorkout();
  const { selectedExercises } = state;

  const { 
    handleUnmergeGroupExercise,
    hookNewExerciseToGroupExercise
  } = useSelectedExerciseController();

  const [duration, setDuration] = useState<string>("00:00");

  const formatTime = (time: string) => {
    // Remove any non-digit characters
    const digitsOnly = time.replace(/\D/g, "");

    // Extract hours and minutes
    const hours = digitsOnly.slice(0, 2);
    const minutes = digitsOnly.slice(2, 4);

    // Format the time as "HH:MM"
    return `${hours}:${minutes}`;
  };

  const HookButton = ({ hookType }: { hookType: 'next' | 'prev' }) => {
    return (
      <div className="flex items-center w-full">
        <Tooltip 
          value="Hook to circuit"
          className="m-auto"
          tooltipClassName="min-w-[100px]"
        >
          <IconButton
            onClick={() => {
              hookNewExerciseToGroupExercise(
                hookType,
                exerciseSecondaryId,
                exerciseIndex,
                "circuitExercises"
              )
            }}
            className="m-auto bg-purple-100 dark:bg-purple-950 border dark:border-purple-900 border-purple-500 dark:hover:bg-purple-800"
          >
            <HookIcon className="h-5 w-5 fill-[#FFF]"/>
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const handleTimeChange = (e: any) => {
    const input = e.target;
    const inputTime = input.value;
    const formattedTime = formatTime(inputTime);
  
    // Determine cursor position
    const cursorPosition = input.selectionStart;

    // Update state with new value
    setDuration(formattedTime);
  
    // Set cursor position back
    setTimeout(() => {
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
    }, 0);
  };

  return (
    <div className="mt-5">
      {(exerciseIndex > 0) && (
        <HookButton hookType="prev"/>
      )}

      <div className="border-[2px] relative border-solid dark:border-purple-900 border-purple-500 rounded-lg overflow-hidden">
        <div className="bg-purple-100 dark:bg-purple-950 cursor-grab px-5 py-3 flex justify-between">
          <div className="flex gap-[10px] items-center">
            <ViewFinderIcon className="text-purple-950 dark:text-purple-50 w-4 h-4" />
            <p className="text-purple-950 dark:text-purple-50 font-normal">
              Circuit
            </p>
          </div>
          <div className="flex gap-[10px]">
            <div className="flex gap-[10px] items-center w-[150px]">
              <div className={`${tertiaryTextColor} text-[14px] font-medium`}>
                Duration
              </div>
              <TextField 
                value={duration}
                onChange={handleTimeChange}
                disabled
              />
            </div>
            <div>
              <Button
                variant="outlined"
                className="mr-2"
                startIcon={<ViewFinderIcon />}
                onClick={() => {
                  handleUnmergeGroupExercise({
                    exerciseSecondaryId,
                    groupField: "circuitExercises"
                  });
                }}
              >
                Unmerge
              </Button>
            </div>
          </div>
        </div>
        {children}
      </div>

      {selectedExercises && (
        <>
          {selectedExercises.length > exerciseIndex + 1 && (
            <HookButton hookType="next"/>
          )}
        </>
      )}
    </div>
  );
};