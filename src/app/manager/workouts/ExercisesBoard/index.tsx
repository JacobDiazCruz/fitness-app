'use client';

import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import SelectedExercise from "./DraggableExercises/SelectedExercise";
import { initialExercises } from "../YourExercises";
import { Exercise } from "@/utils/types";
import DraggableExercises from "./DraggableExercises";
import { BarbellIcon, CubeTransparentIcon, DropdownIcon, ViewFinderIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";

export default function ExercisesBoard() { 
  const { 
    selectedExercises, 
    updateSelectedExercises,
    handleMergeSuperset,
    handleUnmergeSuperset,
    onDropFromExercises
  } = useWorkout();

  return (
    <div
      className="exercises-section mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFromExercises(e)}
    >
      <p className="mb-3 text-[14px] dark:text-neutral-50 text-neutral-950">
        Exercises
      </p>
      <div className="dark:bg-neutral-950 bg-white dark:border-neutral-800 border-gray-200 btn-actions flex items-center sticky top-[0] h-[70px] z-[500] border-b border-b-solid shadow-sm">
        <Button
          variant="outlined"
          className="mr-2"
          startIcon={<CubeTransparentIcon />}
          onClick={() => handleMergeSuperset()}
        >
          Merge Superset
        </Button>
        <Button
          variant="outlined"
          className="mr-2"
          startIcon={<CubeTransparentIcon />}
          onClick={() => handleUnmergeSuperset()}
        >
          Unmerge Superset
        </Button>
        <Button
          variant="outlined"
          startIcon={<ViewFinderIcon />}
        >
          Make Circuit
        </Button>
      </div>
      <DraggableExercises
        selectedExercises={selectedExercises}
        updateSelectedExercises={updateSelectedExercises}
      />
      <div className="border-[2px] rounded-lg border-dashed dark:border-neutral-800 border-gray-200 mt-5 h-[196px] flex items-center">
        <div className="m-auto">
          <div className="rounded-full w-[52px] h-[52px] dark:bg-neutral-900 bg-gray-100 flex m-auto items-center">
            <BarbellIcon className="m-auto w-6 h-6 fill-gray-500" />
          </div>
          <p className="dark:text-neutral-400 text-neutral-500 mt-3 text-[16px]">
            Drag &amp; Drop your exercise
          </p>
        </div>
      </div>
    </div>
  );
}