import { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import SelectedExercise from "./SelectedExercise";
import { initialExercises } from "../YourExercises";
import { Exercise } from "@/utils/types";
import { CubeTransparentIcon, ViewFinderIcon } from "@/components/global/Icons";

export default function EditExercises() {
  const [selectedExercises, setSelectedExercises] = useState<Array<any>>([]);
  const [draggedExercise, setDraggedExercise] = useState(null);

  const WorkoutNameField = () => {
    return (
      <div className="field">
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

  const mappedExercises = useMemo(
    () =>
      selectedExercises.map((exercise: Exercise, index: number) => {
        if (!exercise) return null; // Skip rendering if exercise is null or undefined
        return (
          <div
            key={exercise._id}
            className="relative"
          >
            <div 
              className="bg-gray-200 w-full h-[180px] absolute rounded-lg"
              style={{
                visibility: draggedExercise === exercise ? 'visible' : 'hidden'
              }}
            ></div>
            <div
              draggable
              data-id={exercise._id}
              id={exercise._id}
              data-index={index}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", ""); // Required for Firefox compatibility
                setDraggedExercise(exercise);
              }}
              onDragEnd={() => setDraggedExercise(null)}
              onDragEnter={(e) => {
                e.preventDefault();
                const targetIndex = selectedExercises.indexOf(draggedExercise);
                if (index !== targetIndex && targetIndex !== -1) {
                  const updatedArr = [...selectedExercises];
                  updatedArr.splice(targetIndex, 1);
                  updatedArr.splice(index, 0, draggedExercise);
                  setSelectedExercises(updatedArr);
                }
              }}
              onDrop={(e) => setDraggedExercise(null)}
              className="cursor-grab"
              style={{
                opacity: draggedExercise === exercise ? 0.01 : 1
              }}
            >
                <SelectedExercise exercise={exercise} exerciseId={exercise._id} />
            </div>
          </div>
        );
      }),
    [selectedExercises, draggedExercise]
  );

  // can be removed
  // useEffect(() => {
  //   let animationFrameId;

  //   const handleDragEnter = (e) => {
  //     e.preventDefault();
  //     const targetIndex = selectedExercises.indexOf(draggedExercise);
  //     if (e.currentTarget.dataset.index && e.currentTarget.dataset.index !== targetIndex) {
  //       const target = Number(e.currentTarget.dataset.index);
  //       animationFrameId = requestAnimationFrame(() => {
  //         const updatedArr = [...selectedExercises];
  //         updatedArr.splice(targetIndex, 1);
  //         updatedArr.splice(target, 0, draggedExercise);
  //         setSelectedExercises(updatedArr);
  //       });
  //     }
  //   };

  //   const handleDragEnd = () => {
  //     cancelAnimationFrame(animationFrameId);
  //     setDraggedExercise(null);
  //   };

  //   const draggables = document.querySelectorAll('.cursor-grab');
  //   draggables.forEach((draggable) => {
  //     draggable.addEventListener('dragenter', handleDragEnter);
  //     draggable.addEventListener('dragend', handleDragEnd);
  //   });

  //   return () => {
  //     draggables.forEach((draggable) => {
  //       draggable.removeEventListener('dragenter', handleDragEnter);
  //       draggable.removeEventListener('dragend', handleDragEnd);
  //     });
  //   };
  // }, [selectedExercises, draggedExercise]);

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
          >
            Superset
          </Button>
          <Button 
            variant="outlined"
            startIcon={<ViewFinderIcon />}
          >
            Circuit
          </Button>
        </div>
        {mappedExercises}
        <div className="border-[2px] rounded-lg border-dashed border-gray-200 mt-5 h-[196px] flex items-center">
          <div className="m-auto">
            <div className="rounded-full w-[52px] h-[52px] bg-gray-100 flex m-auto items-center"></div>
            <p className="mt-3 text-[16px] text-gray-500">Drag &amp; Drop your exercise</p>
          </div>
        </div>
      </div>
    </>
  );
}
