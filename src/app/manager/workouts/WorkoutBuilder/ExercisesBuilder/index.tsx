"use client";

import React, { ReactNode, useEffect } from "react";
import useWorkout from "@/store/Workout/useWorkout";

import SelectedExercises from "./SelectedExercises";
import ExercisesMobileSelection from "./ExercisesMobileSelection";
import ExercisesDekstopDropzone from "./ExercisesDesktopDropzone";
import ExercisesActionButtons from "./ExercisesActionButtons";
import { IExercise } from "@/types/exercise";
import { initialSet } from "@/hooks/workouts/useSelectedExerciseController";

interface ExercisesBuilderProps {
  children: ReactNode;
  workoutData: any;
};

export default function ExercisesBuilder({
  children,
  workoutData
}: ExercisesBuilderProps) {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  /**
   * @purpose drops an exercise from "Your Exercises" section to the ExercisesBoard
   * @note N/A
   */
   const onDropFromExercises = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.getData("exercise")) {
      const exercise: IExercise = JSON.parse(e.dataTransfer.getData("exercise"));
      
      // set additional fields for the dropped exercise and update selectedExercises
      // secondaryId: used for having a second unique identifier in case the same Exercise _id is dropped and selected again
      // sets: every exercise should have at least a single set
      const exercisesList = [...selectedExercises, {
        ...exercise,
        secondaryId: Math.random(),
        sets: [initialSet]
      }];

      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: exercisesList
      });
    }
  };

  useEffect(() => {
    if (workoutData) {
      const { exercises } = workoutData;
      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: exercises
      });
    }
  }, [workoutData]);
  
  return (
    <div
      className="exercises-dropzone mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        onDropFromExercises(e)
      }}
    >
      <h2 className="mb-3 text-[14px] dark:text-neutral-50 text-darkTheme-950">
        Exercises
      </h2>

      {children}
    </div>
  );
}

ExercisesBuilder.ActionButtons = ExercisesActionButtons;
ExercisesBuilder.SelectedExercises = SelectedExercises;
ExercisesBuilder.Desktop = ExercisesDekstopDropzone;
ExercisesBuilder.MobileSelection = ExercisesMobileSelection;