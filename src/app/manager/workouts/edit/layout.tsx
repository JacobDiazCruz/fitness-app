'use client';

import { ReactNode } from "react";
import { WorkoutProvider } from "@/contexts/Workout";
import AddNewWorkout from "./AddNewWorkout";

export default function EditWorkoutLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <WorkoutProvider>
      {children}
    </WorkoutProvider>
  );
}