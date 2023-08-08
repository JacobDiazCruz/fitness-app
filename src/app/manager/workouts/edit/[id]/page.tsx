'use client';

import { WorkoutProvider } from "@/store/Workout/useWorkout";
import EditWorkout from "./EditWorkout";

export default function EditWorkoutPage() {
  return (
    <WorkoutProvider>
      <EditWorkout />
    </WorkoutProvider>
  );
};