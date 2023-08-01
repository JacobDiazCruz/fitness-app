'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextField from "@/components/global/TextField";
import { Exercise } from "@/utils/types"
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import { useRouter } from "next/navigation";
import ExerciseItem from "./ExerciseItem";
import EmptyExercises from "./EmptyExercises";
import { SearchIcon } from "@/components/global/Icons";
import { BsSearch } from "react-icons/bs";
import { secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";

export default function YourExercises({
  setInitialSelectedExercises
}: {
  setInitialSelectedExercises?: Dispatch<SetStateAction<Exercise[]>>;
}) {
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
   * @purpose Set the data based on searched exercise
   * @note 
   */
  useEffect(() => {
    const filteredExercise = initialExercises?.filter((exercise: Exercise) => {
      if(exercise.name.toLowerCase().includes(searchExercise.toLowerCase())) {
        return exercise
      }
    });
    setExercisesList(filteredExercise);
  }, [searchExercise, initialExercises]);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>, 
    exercise: Exercise
  ) => {
    e.dataTransfer.setData("exercise", JSON.stringify(exercise))
  };

  /**
   * @purpose To handle click exercise event and set new data for exercisesList
   * @note For mobile use only since desktop views should be a dnd
   */
  const clickExercise = (selectedExercise: Exercise) => {
    if (window?.innerWidth > 640) return;
    
    setExercisesList((prevExercises: any) => {
      const updatedExercises = prevExercises.map((exercise: Exercise) => {
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

      setInitialSelectedExercises?.(updatedExercises);
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
            startIcon={<BsSearch className={`${tertiaryTextColor} w-3 h-3`}/>}
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
              handleDragStart={(e: React.DragEvent<HTMLDivElement>) => {
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