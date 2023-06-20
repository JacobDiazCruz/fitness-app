'use client';

import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import SelectedExercise from "./DraggableExercises/SelectedExercise";
import { initialExercises } from "../YourExercises";
import { Exercise } from "@/utils/types";
import DraggableExercises from "./DraggableExercises";
import { BarbellIcon, CubeTransparentIcon, DropdownIcon, ViewFinderIcon } from "@/components/global/Icons";

export default function ExercisesBoard({
  selectedExercises,
  setSelectedExercises
}: any) {  
  // on drag over event from "Your Exercises" section to the DraggableExercises
  const onDragOverFromExercises = (e) => {
    e.preventDefault();
  };

  // on drop event from "Your Exercises" section to the DraggableExercises
  const onDropFromExercises = (e) => {
    if (e.dataTransfer.getData("exercise")) {
      const exercise: Exercise = JSON.parse(e.dataTransfer.getData("exercise"));
      const exercisesList = [...selectedExercises, {
        ...exercise,
        secondaryId: Math.random()
      }];
      setSelectedExercises(exercisesList);
    }
  };

  // Merge superset logic
  const handleMergeSuperset = () => {
    const checkedItems = selectedExercises.filter((exercise) => exercise.checked);
  
    if (checkedItems.length > 0) {
      const firstCheckedItem = checkedItems[0];
  
      const updatedExercises = selectedExercises.reduce((acc, exercise) => {
        if (exercise === firstCheckedItem) {
          // Replace the first checked item with the new object
          acc.push({
            _id: "424445233242",
            secondaryId: Math.random().toString(),
            name: "",
            checked: false,
            primaryFocus: "",
            category: "",
            supersetExercises: checkedItems
          });
        } else if (!checkedItems.includes(exercise)) {
          // Exclude the other checked items
          acc.push(exercise);
        }
        return acc;
      }, []);
  
      setSelectedExercises(updatedExercises);
    }
  };

  const handleUnmergeSuperset = () => {
    const checkedSupersets = selectedExercises.filter((exercise) => {
      if(exercise.checked && exercise.supersetExercises.length > 0) {
        return exercise
      }
    });

    const unmergedExercises = checkedSupersets.map(exercise => {
      return exercise.supersetExercises;
    }).flat();

    const filteredExercises = checkedSupersets.flatMap((checkedSuperset) =>
      selectedExercises.filter((exercise) => exercise.secondaryId !== checkedSuperset.secondaryId)
    );

    setSelectedExercises([...filteredExercises, ...unmergedExercises]);
  };

  return (
    <div
      className="exercises-section mt-5"
      onDragOver={onDragOverFromExercises}
      onDrop={(e) => onDropFromExercises(e)}
    >
      <p className="mb-3 text-[14px] dark:text-neutral-50 text-neutral-950">
        Exercises
      </p>
      <div className="dark:bg-neutral-950 bg-white dark:border-neutral-700 border-gray-200 btn-actions flex items-center sticky top-[0] h-[70px] z-[500] border-b border-b-solid shadow-sm">
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
        setSelectedExercises={setSelectedExercises}
      />
      <div className="border-[2px] rounded-lg border-dashed dark:border-neutral-700 border-gray-200 mt-5 h-[196px] flex items-center">
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
