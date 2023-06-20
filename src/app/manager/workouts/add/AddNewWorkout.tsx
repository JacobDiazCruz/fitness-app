'use client';

import { useState } from "react";
import ExercisesBoard from "../ExercisesBoard";
import YourExercises from "../YourExercises";
import Header from "../../Header";
import TextField from "@/components/global/TextField";
import TextArea from "@/components/global/TextArea";
import { addWorkout } from "@/api/Workout";
import { useMutation } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter } from "next/navigation";

export default function AddNewWorkout() {
  const router = useRouter();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Array<any>>([]);
  const { dispatchAlert } = useAlert();

  // upload files to cloudinary request
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
        handleSubmit={() => addWorkoutMutation.mutateAsync({
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
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