'use client';

import { useState } from "react";
import Header from "../../Header";
import { addWorkout } from "@/api/Workout";
import { useMutation } from "react-query";
import useAlert from "@/store/Alert";
import { useRouter } from "next/navigation";
import useWorkout from "@/store/Workout/useWorkout";
import WorkoutBuilder from "../WorkoutBuilder";
import useAddProgramWorkout from "@/store/Workout/useAddProgramWorkout";

export default function AddNewWorkout() {
  const router = useRouter();

  const { state } = useWorkout();
  const { selectedExercises } = state;

  const {
    programId,
    buildProgramWorkout
  } = useAddProgramWorkout();

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
  
  const submitForm = async () => {
    if(programId) {
      buildProgramWorkout(
        workoutName,
        workoutDescription,
        selectedExercises
      );
    } else {
      addWorkoutMutation.mutateAsync({
        name: workoutName,
        description: workoutDescription,
        exercises: selectedExercises
      });
    }
  };

  return (
    <>
      <Header 
        pageTitle="Add New Workout"
        backIcon
        backPath="/manager/workouts"
        showActionButtons
        isLoading={addWorkoutMutation.isLoading}
        handleSubmit={() => submitForm()}
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