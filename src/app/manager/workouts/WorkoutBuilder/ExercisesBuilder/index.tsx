'use client';

import React, { ReactNode } from "react";
import useWorkout from "@/contexts/Workout/useWorkout";

import SelectedExercises from "./SelectedExercises";
import ExercisesMobileSelection from "./ExercisesMobileSelection";
import ExercisesDekstopDropzone from "./ExercisesDesktopDropzone";
import ExercisesActionButtons from "./ExercisesActionButtons";
import { UseWorkout } from "@/utils/workoutTypes";

interface ExercisesBuilderProps {
  children: ReactNode;
};

export default function ExercisesBuilder({
  children
}: ExercisesBuilderProps) {
  const {
    onDropFromExercises
  }: UseWorkout = useWorkout()!;
  
  return (
    <div
      className="exercises-dropzone mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        onDropFromExercises?.(e)
      }}
    >
      <h2 className="mb-3 text-[14px] dark:text-neutral-50 text-darkTheme-950">
        Exercises
      </h2>

      {children}
    </div>
  );
};

ExercisesBuilder.ActionButtons = ExercisesActionButtons;
ExercisesBuilder.SelectedExercises = SelectedExercises;
ExercisesBuilder.Desktop = ExercisesDekstopDropzone;
ExercisesBuilder.MobileSelection = ExercisesMobileSelection;