'use client';

import { useState } from "react";
import Header from "../../Header";
import { addWorkout } from "@/api/Workout";
import { useMutation } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter } from "next/navigation";
import useWorkout from "@/contexts/Workout/useWorkout";
import WorkoutBuilder from "../WorkoutBuilder";
import { UseWorkout } from "@/utils/workoutTypes";

export default function AddNewWorkout() {
  const router = useRouter();
  const { 
    selectedExercises
  }: UseWorkout = useWorkout()!;
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const { dispatchAlert }: any = useAlert();

  const addWorkoutMutation = useMutation(addWorkout, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Workout created successfully"
      });
      router.push('/manager/workouts');
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <>
      <Header 
        pageTitle="Add New Workout"
        backIcon
        backPath="/manager/workouts"
        showActionButtons
        isLoading={addWorkoutMutation.isLoading}
        handleSubmit={() => addWorkoutMutation.mutateAsync({
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        })}
      />
      <WorkoutBuilder
        workoutName={workoutName}
        workoutDescription={workoutDescription}
        setWorkoutName={setWorkoutName}
        setWorkoutDescription={setWorkoutDescription}
      />
    </>
  );
}