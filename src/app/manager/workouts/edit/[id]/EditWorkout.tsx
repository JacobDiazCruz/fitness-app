'use client';

import { useEffect, useState } from "react";
import Header from "../../../Header";
import { editWorkout, getWorkout } from "@/api/Workout";
import { useMutation, useQuery } from "react-query";
import useAlert from "@/contexts/Alert";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import useWorkout from "@/contexts/Workout/useWorkout";
import WorkoutBuilder from "../../WorkoutBuilder";
import useEditProgram from "@/hooks/useEditProgram";
import { WorkoutContext } from "@/utils/workoutTypes";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const editProgram = searchParams.get("editProgram")

  // hooks
  const {
    selectedExercises,
    setSelectedExercises 
  }: WorkoutContext = useWorkout()!;
  const {
    programWeeks,
    programWeekIndex,
    programDayIndex,
    programWorkoutIndex,
    programWorkoutSecondaryId,
    isLoadingEditProgram,
    handleMutateProgram
  }: any = useEditProgram();
  
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");
  const { dispatchAlert }: any = useAlert();

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
    data: workoutData
  } = useQuery('workout', () => getWorkout(params.id), {
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (workoutData && !editProgram) {
      const { name, description, exercises } = workoutData;
      setWorkoutName(name);
      setWorkoutDescription(description);
      setSelectedExercises?.(exercises);
    }
  }, [workoutData]);

  useEffect(() => {
    if (programWeekIndex && editProgram) {
      const programWorkout = programWeeks[programWeekIndex]?.days[programDayIndex]?.workouts?.[programWorkoutIndex]
      const { name, description, exercises } = programWorkout;

      setWorkoutName(name);
      setWorkoutDescription(description);
      setSelectedExercises?.(exercises);
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

  if(isError) {
    dispatchAlert({
      type: "ERROR",
      message: "Error in fetching workout data. Please try again."
    })
  }

  return (
    <>
      <Header 
        pageTitle="Edit Workout"
        backIcon
        showActionButtons
        isLoading={editWorkoutMutation.isLoading || isLoadingEditProgram}
        handleSubmit={() => handleSubmit()}
      />
      <WorkoutBuilder
        workoutName={workoutName}
        workoutDescription={workoutDescription}
        setWorkoutName={setWorkoutName}
        setWorkoutDescription={setWorkoutDescription}
      />
    </>
  );
};