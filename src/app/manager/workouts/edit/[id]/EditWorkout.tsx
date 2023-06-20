'use client';

import { useEffect, useState } from "react";
import ExercisesBoard from "../../ExercisesBoard";
import YourExercises from "../../YourExercises";
import Header from "../../../Header";
import TextField from "@/components/global/TextField";
import TextArea from "@/components/global/TextArea";
import { addWorkout, editWorkout, getWorkout } from "@/api/Workout";
import { useMutation, useQuery } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter, useParams } from "next/navigation";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Array<any>>([]);
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
      setSelectedExercises(exercises);
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
      <div className="flex gap-[40px]">
        <div className="md:w-[40%] form dark:bg-neutral-950 dark:border-neutral-950 bg-white sticky top-[5em] h-[80vh] shadow-sm border border-solid border-gray-200 py-8 rounded-lg mt-5">
          <YourExercises />
        </div>

        <div className="form dark:bg-neutral-950 dark:border-neutral-950 border border-solid border-gray-200 shadow-sm w-full p-8 rounded-lg mt-5">
          <div className="field w-[50%]">
            <p className="dark:text-neutral-50 text-neutral-950 mb-3 text-[14px]">
              Workout name
            </p>
            <TextField
              placeholder="e.g. Chest workout"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
          <div className="field w-[50%] mt-7">
            <p className="dark:text-neutral-50 text-neutral-950 mb-3 text-[14px]">
              Description
            </p>
            <TextArea
              rows={2}
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
            />
          </div>
          <ExercisesBoard
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
          />
        </div>
      </div>
    </>
  );
}