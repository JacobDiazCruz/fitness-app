"use client";

import { useEffect, useState } from "react";
import { getWorkout } from "@/api/Workout";
import { useQuery } from "react-query";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import WorkoutBuilder from "../../WorkoutBuilder";
import { getProgramWorkout } from "@/api/Program";
import WorkoutHeader from "../../WorkoutHeader";

export default function EditWorkout() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const editProgram = searchParams.get("editProgram");

  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDescription, setWorkoutDescription] = useState<string>("");

  // get exercise data
  const {
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
      const { name, description } = workoutData;
      setWorkoutName(name);
      setWorkoutDescription(description);
    }
  }, [workoutData]);

  if(isErrorFetching) {
    router.push('/manager/workouts');
  }

  return (
    <>
      <WorkoutHeader 
        workoutName={workoutName}
        workoutDescription={workoutDescription}
        workoutData={workoutData}
      />
      <WorkoutBuilder
        workoutName={workoutName}
        workoutDescription={workoutDescription}
        setWorkoutName={setWorkoutName}
        setWorkoutDescription={setWorkoutDescription}
        workoutData={workoutData}
      />
    </>
  );
};