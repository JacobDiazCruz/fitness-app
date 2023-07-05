import React from "react";
import Button from "@/components/global/Button";
import { CubeTransparentIcon, DropdownIcon } from "@/components/global/Icons";
import { Exercise } from "@/utils/types";

interface Props {
  child: any;
  supersetExercises: Exercise[];
  exerciseIndex: number;
  setTargetExerciseId: any;
  exerciseSecondaryId: string;
  handleCheck: any;
  handleDrop: any;
  handleRemoveExercise: any;
  handleUnmergeSuperset: any;
};

export default function SupersetExercises({
  child,
  setTargetExerciseId,
  supersetExercises,
  exerciseIndex,
  exerciseSecondaryId,
  handleCheck,
  handleDrop,
  handleRemoveExercise,
  handleUnmergeSuperset
}: Props) {
  return (
    <div
      className="border-[2px] relative cursor-grab border-solid border-blue-900 rounded-lg overflow-hidden mt-5"
      onDragOver={(e) => {
        e.preventDefault();
        setTargetExerciseId(exerciseSecondaryId);
      }}
      onDrop={(e) => handleDrop(e, exerciseIndex)}
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
          <button onClick={() => setShowExerciseForm(!showExerciseForm)}>
            <DropdownIcon className="fill-white w-6 h-6" />
          </button>
        </div>
      </div>

      {supersetExercises.map((superExercise, supersetIndex) => {
        const {
          secondaryId,
          name,
          checked,
          videoLink,
          files,
          primaryFocus,
          sets
        } = superExercise;

        return (
          <div key={secondaryId}>
            {React.cloneElement(child, {
              exerciseType: "superset",
              name,
              checked,
              videoLink,
              exerciseId: secondaryId,
              sets,
              exerciseIndex,
              supersetIndex,
              primaryFocus,
              handleRemoveExercise: () => handleRemoveExercise(secondaryId),
              showCheckInput: false,
              onCheck: () => handleCheck(secondaryId)
            })}
          </div>
        );
      })}
    </div>
  );
}