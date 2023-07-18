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
import { editProgramWorkout, getProgramWorkout } from "@/api/Program";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const editProgram = searchParams.get("editProgram");

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
    isLoadingEditProgram
  }: any = useEditProgram();
  
  const { dispatchAlert }: any = useAlert();

  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");

  const editWorkoutMutation = useMutation(editWorkout, {
    onSuccess: async () => {
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

  const editProgramWorkoutMutation = useMutation(editProgramWorkout, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Program's workout edited successfully"
      });
      router.back();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // get exercise data
  const {
    isLoading,
    isError: isErrorFetching,
    data: workoutData,
    refetch
  } = useQuery('workout', () => {
    if(editProgram) {
      return getProgramWorkout(params.id)
    } else {
      return getWorkout(params.id)
    }
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 2
  });

  useEffect(() => {
    refetch();
  }, [params.id]);

  useEffect(() => {
    if (workoutData) {
      const { name, description, exercises } = workoutData;
      setWorkoutName(name);
      setWorkoutDescription(description);
      setSelectedExercises?.(exercises);
    }
  }, [workoutData]);

  // useEffect(() => {
  //   if (programWeekIndex && editProgram) {
  //     const programWorkout = programWeeks[programWeekIndex]?.days[programDayIndex]?.workouts?.[programWorkoutIndex]
  //     const { name, description, exercises } = programWorkout;
      
  //     console.log("programWorkoutgg", programWorkout)
  //     setWorkoutName(name);
  //     setWorkoutDescription(description);
  //     setSelectedExercises?.(exercises);
  //   }
  // }, [workoutData, programWeekIndex, params.id]);

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
      const { _id, ...existingWorkoutData } = workoutData;

      editProgramWorkoutMutation.mutateAsync({
        id: params.id,
        data: {
          ...existingWorkoutData,
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        }
      });
    }
  };

  if(isErrorFetching) {
    router.push('/manager/workouts');
  }

  return (
    <>
      <Header 
        pageTitle="Edit Workout"
        backIcon
        showActionButtons
        isLoading={editWorkoutMutation.isLoading || isLoadingEditProgram}
        handleSubmit={handleSubmit}
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