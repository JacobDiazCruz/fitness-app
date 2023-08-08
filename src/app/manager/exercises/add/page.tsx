'use client';
import ExerciseProvider from "@/store/Exercise/useExercise";
import AddNewExercise from "./AddNewExercise";

export default function AddExercise() {
  return (
    <ExerciseProvider>
      <AddNewExercise />
    </ExerciseProvider>
  );
};