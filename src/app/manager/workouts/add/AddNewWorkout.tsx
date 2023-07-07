'use client';

import { useState } from "react";
import Header from "../../Header";
import { addWorkout } from "@/api/Workout";
import { useMutation } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter } from "next/navigation";
import useWorkout from "@/contexts/Workout";
import WorkoutBuilder from "../WorkoutBuilder";

export default function AddNewWorkout() {
  const router = useRouter();
  const { 
    selectedExercises, 
    setSelectedExercises
  } = useWorkout();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const { dispatchAlert } = useAlert();

  const addWorkoutMutation = useMutation(addWorkout, {
    onSuccess: async (data) => {
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