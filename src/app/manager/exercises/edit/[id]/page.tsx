'use client';
import ExerciseProvider from "@/store/Exercise/useExercise";
import EditExercise from "./EditExercise";

export default function EditExercisePage() {
  return (
    <ExerciseProvider>
      <EditExercise />
    </ExerciseProvider>
  );
};