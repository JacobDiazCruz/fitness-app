import { useEffect, useState, useMemo } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import SelectedExercise from "./SelectedExercise";
import { EXERCISES_LIST } from "../YourExercises";
import { Exercise } from "@/utils/types";

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
          // <div className="w-[100%] h-[200px] bg-gray"></div>
          <div
            key={exercise._id}
            draggable="true"
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
              if (index !== targetIndex) {
                const updatedArr = [...selectedExercises];
                updatedArr.splice(targetIndex, 1);
                updatedArr.splice(index, 0, draggedExercise);
                setSelectedExercises(updatedArr);
              }
            }}
            className="cursor-grab"
            style={{
              opacity: draggedExercise === exercise ? 0.3 : 1
            }}
          >
            <SelectedExercise exercise={exercise} exerciseId={exercise._id} />
          </div>
        );
      }),
    [selectedExercises, draggedExercise]
  );  

  useEffect(() => {
    let animationFrameId;

    const handleDragEnter = (e) => {
      e.preventDefault();
      const targetIndex = selectedExercises.indexOf(draggedExercise);
      if (e.currentTarget.dataset.index && e.currentTarget.dataset.index !== targetIndex) {
        const target = Number(e.currentTarget.dataset.index);
        animationFrameId = requestAnimationFrame(() => {
          const updatedArr = [...selectedExercises];
          updatedArr.splice(targetIndex, 1);
          updatedArr.splice(target, 0, draggedExercise);
          setSelectedExercises(updatedArr);
        });
      }
    };

    const handleDragEnd = () => {
      cancelAnimationFrame(animationFrameId);
      setDraggedExercise(null);
    };

    const draggables = document.querySelectorAll('.cursor-grab');
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragenter', handleDragEnter);
      draggable.addEventListener('dragend', handleDragEnd);
    });

    return () => {
      draggables.forEach((draggable) => {
        draggable.removeEventListener('dragenter', handleDragEnter);
        draggable.removeEventListener('dragend', handleDragEnd);
      });
    };
  }, [selectedExercises, draggedExercise]);

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
          <Button variant="outlined mr-2">Superset</Button>
          <Button variant="outlined">Circuit</Button>
        </div>
        {mappedExercises}
        <div className="border-[2px] rounded-lg border-dashed border-gray-300 mt-5 h-[196px] flex items-center">
          <div className="m-auto">
            <div className="rounded-full w-[52px] h-[52px] bg-gray-100 flex m-auto items-center"></div>
            <p className="mt-3 text-[16px] text-gray-500">Drag &amp; Drop your exercise</p>
          </div>
        </div>
      </div>
    </>
  );
}
