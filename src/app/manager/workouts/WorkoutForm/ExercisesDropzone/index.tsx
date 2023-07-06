'use client';

import React from "react";
import useWorkout from "@/contexts/Workout";

import Draggable from "./Draggable";
import ExercisesMobileSelection from "./ExercisesMobileSelection";
import ExercisesDekstopDropzone from "./ExercisesDesktopDropzone";
import ExercisesActionButtons from "./ExercisesActionButtons";

export default function ExercisesDropzone() {
  const {
    onDropFromExercises
  } = useWorkout();
  
  return (
    <div
      className="exercises-dropzone mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFromExercises(e)}
    >
      <h2 className="mb-3 text-[14px] dark:text-neutral-50 text-darkTheme-950">
        Exercises
      </h2>

      <ExercisesActionButtons />

      <Draggable>
        <Draggable.SelectedExercise />
      </Draggable>

      <ExercisesDekstopDropzone />
      <ExercisesMobileSelection />
    </div>
  );
};