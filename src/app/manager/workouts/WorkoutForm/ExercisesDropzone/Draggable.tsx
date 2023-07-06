import React, { useState } from "react";
import useWorkout from "@/contexts/Workout";
import useSelectedExercisesDnd from "@/hooks/workouts/useSelectedExercisesDnd";
import { Exercise } from "@/utils/types";
import SupersetExercises from "./SupersetExercises";
import SelectedExercise from "./SelectedExercise";

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
   * @Purpose To return a superset or normal "SelectedExercise" child component
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
          <SupersetExercises 
            child={child}
            exerciseSecondaryId={exercise.secondaryId}
            setTargetExerciseId={setTargetExerciseId}
            supersetExercises={exercise?.supersetExercises}
            exerciseIndex={exerciseIndex}
            handleCheck={handleCheck}
            handleDrop={handleDrop}
            handleRemoveExercise={handleRemoveExercise}
            handleUnmergeSuperset={handleUnmergeSuperset}
          />
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
      {selectedExercises?.map((exercise: Exercise, exerciseIndex: number) => (
        <div
          key={exerciseIndex}
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
            data-index={exerciseIndex}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "");
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => handleDrop(e, exerciseIndex, exercise)}
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
              exerciseIndex: exerciseIndex
            })}
          </div>
        </div>
      ))}
    </>
  );
};

Draggable.SelectedExercise = SelectedExercise;