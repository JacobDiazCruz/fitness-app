import React, { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import SelectedExercise from "./SelectedExercise";
import { initialExercises } from "../YourExercises";
import { Exercise } from "@/utils/types";
import MappedExercises from "./MappedExercises";
import { BarbellIcon, CubeTransparentIcon, DropdownIcon, ViewFinderIcon } from "@/components/global/Icons";

export default function EditExercises() {
  const [selectedExercises, setSelectedExercises] = useState<Array<any>>([]);

  const WorkoutNameField = () => {
    return (
      <div className="field w-[50%]">
        <p className="mb-3 text-[14px]">Workout name</p>
        <TextField placeholder="e.g. Chest workout" />
      </div>
    );
  };

  const onDragOverFromExercises = (e) => {
    e.preventDefault();
  };

  const onDropFromExercises = (e, cat) => {
    if (e.dataTransfer.getData("exercise")) {
      const exercise: Exercise = JSON.parse(e.dataTransfer.getData("exercise"));
      const exercisesList = [...selectedExercises];
      exercisesList.push(exercise);
      setSelectedExercises(exercisesList);
    }
  };

  const makeSuperset = () => {
    const checkedItems = selectedExercises.filter((exercise) => exercise.checked);
  
    if (checkedItems.length > 0) {
      const firstCheckedItem = checkedItems[0];
  
      const updatedExercises = selectedExercises.reduce((acc, exercise) => {
        if (exercise === firstCheckedItem) {
          // Replace the first checked item with the new object
          acc.push({
            _id: "424445233242",
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

  return (
    <>
      <WorkoutNameField />
      <div
        className="exercises-section mt-5"
        onDragOver={onDragOverFromExercises}
        onDrop={(e) => onDropFromExercises(e, "selected")}
      >
        <p className="mb-3 text-[14px]">Exercises</p>
        <div className="btn-actions flex items-center">
          <Button
            variant="outlined mr-2"
            startIcon={<CubeTransparentIcon />}
            onClick={() => makeSuperset()}
          >
            Make Superset
          </Button>
          <Button
            variant="outlined"
            startIcon={<ViewFinderIcon />}
          >
            Make Circuit
          </Button>
        </div>
        <MappedExercises
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
        />

        <div className="border-[2px] rounded-lg border-dashed border-gray-200 mt-5 h-[196px] flex items-center">
          <div className="m-auto">
            <div className="rounded-full w-[52px] h-[52px] bg-gray-100 flex m-auto items-center">
              <BarbellIcon className="m-auto w-6 h-6 fill-gray-500" />
            </div>
            <p className="mt-3 text-[16px] text-gray-500">Drag &amp; Drop your exercise</p>
          </div>
        </div>
      </div>
    </>
  );
}
