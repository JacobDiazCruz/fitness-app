'use client';

import { ProgramProvider } from "@/contexts/Program/useProgram";
import { WorkoutProvider } from "@/contexts/Workout/useWorkout";
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