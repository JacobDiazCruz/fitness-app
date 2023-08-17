import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import { IExercise } from "@/types/exercise";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

export default function useExercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<any>(
    // @ts-ignore
    null
  );
  const [currentExerciseSet, setCurrentExerciseSet] = useState<any>(
    // @ts-ignore
    null
  );

  const currentExerciseSetIndexRef = useRef<number>(currentExerciseSet?.index);
  const currentExerciseSetRef = useRef<any>(currentExerciseSet);

  const isLastExercise = () => currentExercise?.index === exercises.length - 1;
  
  const isLastExerciseSet = () => {
    return exercises[currentExerciseSetIndexRef.current].sets.length - 1 == currentExerciseSet?.index;
  };

  useEffect(() => {
    currentExerciseSetIndexRef.current = currentExerciseSet?.index;
  }, [currentExerciseSet?.index]);

  useEffect(() => {
    currentExerciseSetRef.current = currentExerciseSet;
  }, [currentExerciseSet]);

  const isExerciseDone = (exercise: IExercise) => {
    return exercise.sets.every((set: any) => set.status === "DONE");
  };

  const isExerciseSetTimeBased = () => {
    return currentExerciseSetRef.current?.time && currentExerciseSetRef.current.time !== "00:00";
  };

  const updateExerciseSet = (status: string, nextIndex: number) => {
    setCurrentExerciseSet((prev: any) => ({
      ...prev,
      status,
      index: nextIndex,
    }));
    handleUpdateExercises(status);
  };

  const handleUpdateExercises = (status: string) => {
    const updatedExercises = exercises.map((exercise: any) => {
      if (exercise.secondaryId === currentExercise.secondaryId) {
        return {
          ...exercise,
          sets: exercise.sets.map((set: any, index: number) => {
            if (index === currentExerciseSet.index) {
              return {
                ...set,
                status
              };
            }
            return set;
          })
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);
  };

  const {
    data: workout,
    isLoading
  } = useQuery(
    'calendarSchedules',
    async () => {
      const data = await listWeeklyCalendarSchedules(JSON.stringify([new Date().toLocaleDateString()]));
      return data[0];
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: true
    }
  );

  useEffect(() => {
    if (workout) {
      const flattenedExercises = workout.workoutDetails.exercises.reduce((acc: any, exercise: IExercise) => {
        if (exercise.supersetExercises) {
          acc.push(...exercise.supersetExercises.map((subExercise: IExercise) => ({ ...subExercise, groupId: exercise._id })));
        } else if (exercise.circuitExercises) {
          acc.push(...exercise.circuitExercises.map((subExercise: IExercise) => ({ ...subExercise, groupId: exercise._id })));
        } else {
          acc.push({ ...exercise, groupId: exercise._id });
        }
        return acc;
      }, []);
  
      setExercises(flattenedExercises);
  
      setCurrentExercise({
        ...flattenedExercises[0],
        index: 0
      });
  
      setCurrentExerciseSet({
        ...flattenedExercises[0].sets[0],
        index: 0
      });
    }
  }, [workout]);  

  return {
    exercises,
    setExercises,
    currentExercise,
    setCurrentExercise,
    currentExerciseSet,
    setCurrentExerciseSet,
    isLastExercise,
    isLastExerciseSet,
    isLoading,
    isExerciseDone,
    isExerciseSetTimeBased,
    updateExerciseSet
  };
};