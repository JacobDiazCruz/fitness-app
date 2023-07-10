'use client';
import ExerciseProvider from "@/contexts/Exercise/useExercise";
import EditExercise from "./EditExercise";

export default function EditExercisePage() {
  return (
    <ExerciseProvider>
      <EditExercise />
    </ExerciseProvider>
  );
};