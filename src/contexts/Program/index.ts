'use client';

import { DraggableWorkoutProvider } from "./useDraggableWorkout";
import { combineComponents } from "@/utils/combineComponents"
import { ProgramWorkoutsProvider } from "./useProgramWorkouts";
import { ProgramProvider } from "./useProgram";

const providers = [
  ProgramProvider,
  DraggableWorkoutProvider,
  ProgramWorkoutsProvider,
];

const ProgramContextProvider = combineComponents(...providers);
export default ProgramContextProvider;