import React, { useState } from "react";
import useWorkout from "@/contexts/Workout/useWorkout";
import { Exercise } from "@/utils/types";
import SelectedExercise from "./SelectedExercise";
import DragController from "./DragController";
import Superset from "./Superset";
import { WorkoutContext } from "@/utils/workoutTypes";

interface selectedExerciseFactoryParams {
  exercise: Exercise;
  exerciseType: string;
  exerciseIndex: number;
};

export default function SelectedExercises() {
  const {
    selectedExercises
  }: WorkoutContext = useWorkout()!;

  const [draggedExercise, setDraggedExercise] = useState<Exercise | null>(null);

  /**
   * @Purpose To return a superset or normal "SelectedExercise" component
   * @Note N/A
   */
  const selectedExerciseFactory = ({
    exercise,
    exerciseType,
    exerciseIndex
  }: selectedExerciseFactoryParams) => {

    if (exerciseType === "superset") {
      return (
        <Superset
          exerciseSecondaryId={exercise?.secondaryId}
          exerciseIndex={exerciseIndex}
        >
          {exercise.supersetExercises?.map((supersetExercise: Exercise, supersetIndex: number) => (
            <SelectedExercise>
              <SelectedExercise.Header
                exercise={supersetExercise}
                showCheckInput={false}
              />
              <SelectedExercise.Form
                exercise={supersetExercise}
                exerciseType={exerciseType}
                exerciseIndex={exerciseIndex}
                supersetIndex={supersetIndex}
              />
            </SelectedExercise>
          ))}
        </Superset>
      );
    } else if (exerciseType === "normal") {
      return (
        <SelectedExercise>
          <SelectedExercise.Header exercise={exercise} />
          <SelectedExercise.Form
            exercise={exercise}
            exerciseType={exerciseType}
            exerciseIndex={exerciseIndex}
          />
        </SelectedExercise>
      );
    }
  };
  
  return (
    <>
      {selectedExercises?.map((exercise: Exercise, exerciseIndex: number) => {
        return (
          <DragController 
            key={exercise.secondaryId}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            draggedExercise={draggedExercise}
            setDraggedExercise={setDraggedExercise}
          >
            {selectedExerciseFactory({
              exercise,
              exerciseType: 
                exercise.supersetExercises?.length
                  ? "superset"
                    : "normal",
              exerciseIndex: exerciseIndex
            })}
          </DragController>
        );
      })}
    </>
  );
};