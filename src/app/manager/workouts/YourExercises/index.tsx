'use client';

import { useEffect, useState } from "react";
import TextField from "@/components/global/TextField";
import Image from "next/image";
import { Exercise } from "@/utils/types"
import { AddIcon, CheckIcon, DragIcon } from "@/components/global/Icons";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import { borderColor, fieldBgColor, tertiaryBgColor } from "@/utils/themeColors";
import useWorkout from "@/contexts/Workout";
import ExerciseItem from "./ExerciseItem";
import EmptyExercises from "./EmptyExercises";

export default function YourExercises({
  setInitialSelectedExercises
}: {
  setInitialSelectedExercises?: any
}) {
  const router = useRouter();

  const [searchExercise, setSearchExercise] = useState<string>("");
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);

  // fetch exercises list
  const { 
    isLoading,
    isError, 
    data: initialExercises,
    error, 
    refetch 
  } = useQuery('exercises', listExercises);

  /**
   * @Purpose Set the data based on searched exercise
   * @Note 
   */
  useEffect(() => {
    const filteredExercise = initialExercises?.filter((exercise: Exercise) => {
      if(exercise.name.toLowerCase().includes(searchExercise.toLowerCase())) {
        return exercise
      }
    });
    setExercisesList(filteredExercise);
  }, [searchExercise, initialExercises]);

  const onDragStart = (e, exercise) => {
    e.dataTransfer.setData("exercise", JSON.stringify(exercise))
  };

  /**
   * @Purpose To handle click exercise event and set new data for exercisesList
   * @Note For mobile use only since desktop views should be a dnd
   */
  const clickExercise = (selectedExercise: Exercise) => {
    if (window?.innerWidth > 640) return;
    
    setExercisesList(prevExercises => {
      const updatedExercises = prevExercises.map(exercise => {
        if (exercise._id === selectedExercise._id) {
          return {
            ...exercise,
            isSelected: !exercise?.isSelected,
            secondaryId: Math.random(),
            sets: [{
              setType: "",
              reps: null,
              rest: "00:00"
            }]
          };
        }
        return exercise;
      });

      setInitialSelectedExercises(updatedExercises);
      return updatedExercises;
    });
  };

  return (
    <>
      <div>
        <h2 className="dark:text-neutral-50 text-darkTheme-950 text-[18px] font-medium">
          Your Exercises
        </h2>
        <div className="mt-5">
          <TextField
            startIcon={<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
            placeholder="Search exercise"
            value={searchExercise}
            onChange={(e) => setSearchExercise(e.target.value)}
          />
        </div>
      </div>
      <div className="exercises-list overflow-auto overflow-x-hidden h-[61vh] mt-2 pt-6">
        {exercisesList?.length > 0 ? (
          exercisesList?.map((exercise: Exercise) => (
            <ExerciseItem
              exercise={exercise}
              handleClickExercise={() => {
                clickExercise(exercise)
              }}
              handleDragStart={(e) => {
                onDragStart(e, exercise)
              }}
            />
          ))
        ) : (
          <EmptyExercises />
        )}
      </div>
    </>
  );
}