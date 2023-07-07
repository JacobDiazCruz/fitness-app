import React, { ReactNode } from "react";
import Button from "@/components/global/Button";
import { CubeTransparentIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";

interface SupersetProps {
  exerciseIndex: number;
  exerciseSecondaryId?: string;
  children: ReactNode;
};

export default function Superset({
  exerciseIndex,
  exerciseSecondaryId,
  children
}: SupersetProps) {
  const {
    handleUnmergeSuperset
  }: any = useWorkout();

  return (
    <div
      className="border-[2px] relative cursor-grab border-solid border-blue-900 rounded-lg overflow-hidden mt-5"
      // onDragOver={(e) => {
      //   e.preventDefault();
      //   // setTargetExerciseId(exerciseSecondaryId);
      // }}
    >
      <div className="bg-blue-900 px-5 py-3 flex justify-between">
        <div className="flex gap-[10px] items-center">
          <CubeTransparentIcon className="text-white w-4 h-4" />
          <p className="text-white font-normal">Superset</p>
        </div>
        <div>
          <Button
            variant="outlined"
            className="mr-2"
            startIcon={<CubeTransparentIcon />}
            onClick={() => handleUnmergeSuperset(exerciseSecondaryId)}
          >
            Unmerge Superset
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}