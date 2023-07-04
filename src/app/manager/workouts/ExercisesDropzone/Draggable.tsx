import React, { useState } from "react";
import useWorkout from "@/contexts/Workout";
import useSelectedExercisesDnd from "@/hooks/workouts/useSelectedExercisesDnd";
import { CubeTransparentIcon, DropdownIcon } from "@/components/global/Icons";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";

export default function Draggable({
  children
}: {
  children: React.ReactNode
}) {
  const { 
    selectedExercises,
    handleUnmergeSuperset
  } = useWorkout();

  const {
    handleDrag,
    handleDrop,
    handleDropSuperset,
    handleRemoveExercise,
    handleCheck,
    draggedExercise,
    targetExerciseId,
    setTargetExerciseId
  } = useSelectedExercisesDnd();

  const [showExerciseForm, setShowExerciseForm] = useState<boolean>(true);

  /**
   * @Purpose To return a superset or normal selected exercise component
   * @Note N/A
   */
  const selectedExerciseFactory = ({
    exercise,
    exerciseType,
    exerciseIndex
  }: {
    exercise: Exercise;
    exerciseType: string;
    exerciseIndex: number;
  }) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (exerciseType === "superset") {
        return (
          <div
            className="border-[2px] relative cursor-grab border-solid border-blue-900 rounded-lg overflow-hidden mt-5"
            onDragOver={(e) => {
              e.preventDefault();
              setTargetExerciseId(exercise.secondaryId);
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
                  onClick={() => handleUnmergeSuperset(exercise.secondaryId)}
                >
                  Unmerge Superset
                </Button>
                <button onClick={() => setShowExerciseForm(!showExerciseForm)}>
                  <DropdownIcon className="fill-white w-6 h-6" />
                </button>
              </div>
            </div>
      
            {exercise?.supersetExercises.map((superExercise, supersetIndex) => {
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

      return React.cloneElement(child, {
        exerciseType: "normal",
        key: exercise.secondaryId,
        name: exercise.name,
        exerciseId: exercise.secondaryId,
        sets: exercise?.sets,
        exerciseIndex,
        videoLink: exercise.videoLink,
        primaryFocus: exercise.primaryFocus,
        handleRemoveExercise: () => handleRemoveExercise(exercise.secondaryId),
        checked: exercise.checked,
        onCheck: () => handleCheck(exercise.secondaryId)
      });
    })
  };
  
  return (
    <>
      {selectedExercises?.map((exercise: Exercise, index: number) => (
        <div
          key={index}
          className="draggable"
        >
          <div
            className="dragging-placeholder dark:bg-darkTheme-900 bg-neutral-200 w-full h-[180px] absolute rounded-lg"
            style={{
              display: draggedExercise === exercise ? "block" : "none"
            }}
          ></div>
          <div
            draggable
            data-id={exercise.secondaryId}
            id={exercise.secondaryId}
            data-index={index}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "");
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => handleDrop(e, index, exercise)}
            onDrag={(e) => handleDrag(exercise)} // Update state during drag
            className="cursor-grab mt-4"
            style={{
              opacity: draggedExercise === exercise ? 0.01 : 1,
            }}
          >
            {selectedExerciseFactory({
              exercise,
              exerciseType: 
                exercise.supersetExercises?.length
                  ? "superset"
                    : "normal",
              exerciseIndex: index
            })}
          </div>
        </div>
      ))}
    </>
  );
};