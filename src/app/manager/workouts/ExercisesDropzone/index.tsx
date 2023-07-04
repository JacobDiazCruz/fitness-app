'use client';

import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";
import { BarbellIcon, CubeTransparentIcon, DropdownIcon, DumbbellIcon, ViewFinderIcon } from "@/components/global/Icons";
import { secondaryBgColor } from "@/utils/themeColors";
import useWorkout from "@/contexts/Workout";

import SelectExercisesModal from "../SelectExercisesModal";
import SelectedExercise from "./SelectedExercise";
import Draggable from "./Draggable";

Draggable.SelectedExercise = SelectedExercise;

export default function ExercisesDropzone() { 
  const {
    selectedExercises,
    setSelectedExercises,
    handleMergeSuperset,
    handleUnmergeSuperset,
    onDropFromExercises
  } = useWorkout();

  const [showYourExercises, setShowYourExercises] = useState<boolean>(false);
  
  const ActionButtons = () => {
    return (
      <div className={`${secondaryBgColor} sticky top-[49px] dark:border-neutral-800 border-gray-200 btn-actions flex items-center md:-top-[0] h-[70px] z-[100] border-b border-b-solid shadow-sm`}>
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
    );
  };
  
  return (
    <div
      className="exercises-section mt-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFromExercises(e)}
    >
      <h2 className="mb-3 text-[14px] dark:text-neutral-50 text-darkTheme-950">
        Exercises
      </h2>

      <ActionButtons />

      <Draggable>
        <Draggable.SelectedExercise />
      </Draggable>

      {/* Dropzone UI */}
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

      {/* Show "Your Exercises" on mobile view */}
      <Button
        className="w-full mt-8 block md:hidden bg-blue-950 text-blue-500 font-semibold"
        onClick={() => setShowYourExercises(true)}
        startIcon={<DumbbellIcon className="w-5 h-5 fill-[#3B82F6]" />}
      >
        Select Exercise
      </Button>

      {/* @Note: For mobile view only */}
      {showYourExercises && (
        <SelectExercisesModal
          onClose={() => setShowYourExercises(false)}
          setSelectedExercises={setSelectedExercises}
        />
      )}
    </div>
  );
};