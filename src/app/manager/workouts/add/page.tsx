'use client';

import { ProgramProvider } from "@/store/Program/useProgram";
import { WorkoutProvider } from "@/store/Workout/useWorkout";
import AddNewWorkout from "./AddNewWorkout";

export default function AddNewWorkoutPage() {
  return (
    <WorkoutProvider>
      <ProgramProvider>
        <AddNewWorkout />
      </ProgramProvider>
    </WorkoutProvider>
  );
}