'use client';

import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import SelectedExercise from "./DraggableExercises/SelectedExercise";
import YourExercises from "../YourExercises";
import { Exercise } from "@/utils/types";
import DraggableExercises from "./DraggableExercises";
import { BarbellIcon, CubeTransparentIcon, DropdownIcon, ViewFinderIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";
import { secondaryBgColor } from "@/utils/themeColors";
import SelectExercisesModal from "../SelectExercisesModal";

export default function ExercisesBoard() { 
  const { 
    selectedExercises, 
    setSelectedExercises,
    handleMergeSuperset,
    handleUnmergeSuperset,
    onDropFromExercises
  } = useWorkout();

  const [showYourExercises, setShowYourExercises] = useState<boolean>(false);

  return (
    <div
      className="exercises-section mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFromExercises(e)}
    >
      <p className="mb-3 text-[14px] dark:text-neutral-50 text-darkTheme-950">
        Exercises
      </p>
      <div className={`${secondaryBgColor} dark:border-neutral-800 border-gray-200 btn-actions flex items-center sticky top-[50px] md:-top-[0] h-[70px] z-[100] border-b border-b-solid shadow-sm`}>
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
          startIcon={<ViewFinderIcon />}
        >
          Make Circuit
        </Button>
      </div>
      <DraggableExercises
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
      <div className="border-[2px] hidden md:flex rounded-lg border-dashed dark:border-neutral-800 border-gray-200 mt-5 h-[196px] items-center">
        <div className="m-auto">
          <div className="rounded-full w-[52px] h-[52px] dark:bg-darkTheme-900 bg-gray-100 flex m-auto items-center">
            <BarbellIcon className="m-auto w-6 h-6 fill-gray-500" />
          </div>
          <p className="dark:text-neutral-400 text-neutral-500 mt-3 text-[16px]">
            Drag &amp; Drop your exercise
          </p>
        </div>
      </div>
      <Button
        variant="contained"
        className="w-full mt-8 block md:hidden"
        onClick={() => setShowYourExercises(true)}
      >
        Select Exercise
      </Button>

      {/* @Mobile Your Exercises Modal */}
      {showYourExercises && (
        <SelectExercisesModal
          onClose={() => setShowYourExercises(false)}
          setSelectedExercises={setSelectedExercises}
        />
      )}
    </div>
  );
}