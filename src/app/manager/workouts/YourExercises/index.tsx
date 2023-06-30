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
import ExerciseItem from "./Exercise";

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
    if (window?.innerWidth < 640) {
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
    }
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
          <div className="flex items-center w-full mt-3">
            <div className="m-auto">
              <svg t="1686723364331" className="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3468" width="70" height="70"><path d="M512 513.368c-105.53 0-191.074 85.576-191.074 191.074 0 105.558 85.544 191.122 191.074 191.122s191.088-85.562 191.088-191.122c0-105.498-85.558-191.074-191.088-191.074z m0 233.758c-23.562 0-42.67-19.124-42.67-42.686s19.108-42.624 42.67-42.624c23.56 0 42.686 19.062 42.686 42.624S535.56 747.126 512 747.126z" fill="#ED5564" p-id="3469"></path><path d="M0.012 256.466h1023.976v85.342H0.012z" fill="#434A54" p-id="3470"></path><path d="M661.308 256.466c0 11.782 9.562 21.344 21.376 21.344 11.748 0 21.31-9.562 21.31-21.344h-42.686zM575.998 256.466c0 11.782 9.562 21.344 21.312 21.344 11.812 0 21.376-9.562 21.376-21.344h-42.688zM490.672 256.466c0 11.782 9.546 21.344 21.328 21.344 11.78 0 21.326-9.562 21.326-21.344h-42.654zM405.33 256.466c0 11.782 9.562 21.344 21.344 21.344 11.78 0 21.328-9.562 21.328-21.344h-42.672zM320.004 256.466c0 11.782 9.546 21.344 21.328 21.344 11.78 0 21.342-9.562 21.342-21.344h-42.67z" fill="#656D78" p-id="3471"></path><path d="M74.682 192.468c-17.672 0-32 14.342-32 31.998v149.34c0 17.656 14.328 32 32 32 17.67 0 32-14.344 32-32v-149.34c-0.002-17.656-14.33-31.998-32-31.998z" fill="#DA4453" p-id="3472"></path><path d="M138.68 107.126c-17.67 0-32 14.342-32 31.998v320.024c0 17.656 14.328 32 32 32s32-14.344 32-32V139.124c0-17.656-14.328-31.998-32-31.998z" fill="#ED5564" p-id="3473"></path><path d="M202.678 107.126c-17.672 0-32 14.342-32 31.998v320.024c0 17.656 14.328 32 32 32 17.67 0 32-14.344 32-32V139.124c0-17.656-14.328-31.998-32-31.998zM949.302 192.468c17.688 0 32 14.342 32 31.998v149.34c0 17.656-14.312 32-32 32-17.656 0-32-14.344-32-32v-149.34c0-17.656 14.344-31.998 32-31.998z" fill="#DA4453" p-id="3474"></path><path d="M885.302 107.126c17.688 0 32 14.342 32 31.998v320.024c0 17.656-14.312 32-32 32-17.656 0-31.998-14.344-31.998-32V139.124c0-17.656 14.342-31.998 31.998-31.998z" fill="#ED5564" p-id="3475"></path><path d="M821.304 107.126c17.688 0 32 14.342 32 31.998v320.024c0 17.656-14.312 32-32 32-17.654 0-31.998-14.344-31.998-32V139.124c0-17.656 14.344-31.998 31.998-31.998zM512 916.874c-117.124 0-212.416-95.31-212.416-212.432 0-117.124 95.294-212.386 212.416-212.386s212.432 95.264 212.432 212.386c0 117.12-95.308 212.432-212.432 212.432z m0-382.164c-93.592 0-169.746 76.168-169.746 169.73 0 93.622 76.154 169.746 169.746 169.746 93.624 0 169.746-76.124 169.746-169.746 0-93.562-76.122-169.73-169.746-169.73z" fill="#DA4453" p-id="3476"></path><path d="M512 768.438c-35.296 0-64-28.686-64-63.996 0-35.25 28.702-64 64-64 35.31 0 63.998 28.75 63.998 64 0 35.31-28.688 63.996-63.998 63.996z m0-85.31c-11.766 0-21.328 9.562-21.328 21.312 0 11.812 9.562 21.374 21.328 21.374 11.764 0 21.326-9.56 21.326-21.374 0-11.748-9.562-21.312-21.326-21.312z" fill="#DA4453" p-id="3477"></path></svg>
              <p className="text-center font-light text-[14px] text-gray-500 mt-4">
                No exercises yet.
              </p>
              <Button 
                variant="outlined"
                className="mt-5"
                startIcon={<AddIcon />}
                onClick={() => router.push('/manager/exercises/add')}
              >
                Add Exercise
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}