'use client';

import { useEffect, useState } from "react";
import Header from "../../../Header";
import { addWorkout, editWorkout, getWorkout } from "@/api/Workout";
import { useMutation, useQuery } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import useWorkout from "@/contexts/Workout";
import WorkoutForm from "../../WorkoutForm";
import useEditProgram from "@/hooks/useEditProgram";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const editProgram = searchParams.get("editProgram")

  // hooks
  const {
    selectedExercises,
    updateSelectedExercises 
  } = useWorkout();
  const {
    programWeeks,
    programWeekIndex,
    programDayIndex,
    programWorkoutIndex,
    programWorkoutSecondaryId,
    isLoadingEditProgram,
    handleMutateProgram
  } = useEditProgram();
  
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
    if (workoutData && !editProgram) {
      const { name, description, exercises } = workoutData;
      setWorkoutName(name);
      setWorkoutDescription(description);
      updateSelectedExercises(exercises);
    }
  }, [workoutData]);

  useEffect(() => {
    if (programWeekIndex && editProgram) {
      const programWorkout = programWeeks[programWeekIndex]?.days[programDayIndex]?.workouts?.[programWorkoutIndex]
      const { name, description, exercises } = programWorkout;

      setWorkoutName(name);
      setWorkoutDescription(description);
      updateSelectedExercises(exercises);
    }
  }, [programWeekIndex]);

  /**
   * @Purpose This function handles edit workout from workouts page, and edit workout from programs
   * @Note 
   */
  const handleSubmit = () => {
    if(!editProgram) {
      editWorkoutMutation.mutateAsync({
        id: params.id,
        data: {
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        }
      });
    } else {
      const newProgramWeeks = [...programWeeks];
      const currentEditedWorkout = newProgramWeeks[programWeekIndex]?.days[programDayIndex]?.workouts?.[programWorkoutIndex];

      if (currentEditedWorkout) {
        const updatedWorkout = {
          ...currentEditedWorkout,
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        };
        newProgramWeeks[programWeekIndex].days[programDayIndex].workouts[programWorkoutIndex] = updatedWorkout;
      }
      handleMutateProgram(newProgramWeeks);
    }
  };

  return (
    <>
      <Header 
        pageTitle="Edit Workout"
        backIcon
        showActionButtons
        isLoading={editWorkoutMutation.isLoading || isLoadingEditProgram}
        handleSubmit={() => handleSubmit()}
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