'use client';

import { WorkoutProvider } from "@/contexts/Workout/useWorkout";
import AddNewWorkout from "./AddNewWorkout";

export default function AddNewWorkoutPage() {
  return (
    <WorkoutProvider>
      <AddNewWorkout />
    </WorkoutProvider>
  );
}