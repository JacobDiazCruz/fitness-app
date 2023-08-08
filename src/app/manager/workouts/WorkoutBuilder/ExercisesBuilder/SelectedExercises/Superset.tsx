import React, { ReactNode } from "react";
import Button from "@/components/global/Button";
import { CubeTransparentIcon, HookIcon } from "@/components/global/Icons";
import useWorkout from "@/store/Workout/useWorkout";
import IconButton from "@/components/global/IconButton";
import { WorkoutContext } from "@/utils/workoutTypes";
import Tooltip from "@/components/global/Tooltip";

export default function Superset({
  children,
  exerciseSecondaryId = "",
  exerciseIndex
}: {
  children: ReactNode;
  exerciseSecondaryId?: string;
  exerciseIndex: number;
}) {

  const {
    selectedExercises,
    hookNewExerciseToSuperset,
    handleUnmergeSuperset
  }: WorkoutContext = useWorkout();

  const HookButton = ({ hookType }: { hookType: 'next' | 'prev' }) => {
    return (
      <div className="flex items-center w-full">
        <Tooltip 
          value="Hook to superset"
          className="m-auto"
          tooltipClassName="min-w-[120px]"
        >
          <IconButton
            onClick={() => hookNewExerciseToSuperset?.(
              hookType,
              exerciseSecondaryId,
              exerciseIndex
              )}
            className="m-auto bg-blue-100 dark:bg-blue-950 border dark:border-blue-900 border-blue-500 dark:hover:bg-blue-800"
          >
            <HookIcon className="h-5 w-5 fill-[#FFF]"/>
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <div className="mt-5">
      {(exerciseIndex > 0) && (
        <HookButton hookType="prev"/>
      )}

      <div className="border-[2px] relative cursor-grab border-solid dark:border-blue-900 border-blue-500 rounded-lg overflow-hidden">
        <div className="bg-blue-100 dark:bg-blue-950 px-5 py-3 flex justify-between">
          <div className="flex gap-[10px] items-center">
            <CubeTransparentIcon className="text-blue-950 dark:text-blue-50 w-4 h-4" />
            <p className="text-blue-950 dark:text-blue-50 font-normal">
              Superset
            </p>
          </div>
          <div>
            <Button
              variant="outlined"
              className="mr-2"
              startIcon={<CubeTransparentIcon />}
              onClick={() => handleUnmergeSuperset?.(exerciseSecondaryId)}
            >
              Unmerge Superset
            </Button>
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