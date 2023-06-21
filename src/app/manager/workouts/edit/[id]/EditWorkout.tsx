'use client';

import { useEffect, useState } from "react";
import Header from "../../../Header";
import { addWorkout, editWorkout, getWorkout } from "@/api/Workout";
import { useMutation, useQuery } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter, useParams } from "next/navigation";
import useWorkout from "@/contexts/Workout";
import WorkoutForm from "../../WorkoutForm";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const { 
    selectedExercises,
    updateSelectedExercises 
  } = useWorkout();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const { dispatchAlert } = useAlert();

  // upload files to cloudinary request
  const editWorkoutMutation = useMutation(editWorkout, {
    onSuccess: async (data) => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Workout edited successfully"
      });
      router.push('/manager/workouts');
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // get exercise data
  const {
    isLoading,
    isError,
    data: workoutData,
    error,
    refetch
  } = useQuery('workout', () => getWorkout(params.id), {
    refetchOnMount: true
  });

  useEffect(() => {
    if (workoutData) {
      const { name, description, exercises } = workoutData;
      setWorkoutName(name);
      setWorkoutDescription(description);
      updateSelectedExercises(exercises);
    }
  }, [workoutData]);

  return (
    <>
      <Header 
        pageTitle="Edit Workout"
        backIcon
        backPath="/manager/workouts"
        showActionButtons
        isLoading={editWorkoutMutation.isLoading}
        handleSubmit={() => editWorkoutMutation.mutateAsync({
          id: params.id,
          data: {
            name: workoutName,
            description: workoutDescription,
            exercises: selectedExercises
          }
        })}
      />
      <WorkoutForm
        workoutName={workoutName}
        workoutDescription={workoutDescription}
        setWorkoutName={setWorkoutName}
        setWorkoutDescription={setWorkoutDescription}
      />
    </>
  );
}