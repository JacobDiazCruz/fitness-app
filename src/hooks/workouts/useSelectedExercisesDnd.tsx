import useWorkout from "@/contexts/Workout";
import { useState } from "react";

export default function useSelectedExercisesDnd() {
  const { 
    selectedExercises,
    setSelectedExercises
  } = useWorkout();

  const [draggedExercise, setDraggedExercise] = useState(null);
  const [draggedExerciseId, setDraggedExerciseId] = useState(null);
  const [showDropContainer, setShowDropContainer] = useState(false);
  const [targetExerciseId, setTargetExerciseId] = useState("");

  const handleDrag = (exercise: any) => {
    setDraggedExercise(exercise);
  };

  const handleDrop = (e, index, exercise) => {
    e.preventDefault();
    const targetIndex = selectedExercises.indexOf(draggedExercise);
    const currentY = e.clientY;
 
    if (index !== targetIndex && targetIndex !== -1) {
      const updatedArr = [...selectedExercises];
      updatedArr.splice(targetIndex, 1);
      updatedArr.splice(index, 0, draggedExercise);

      setSelectedExercises(updatedArr);
    }

    setTargetExerciseId("");
    setDraggedExercise(null);
    setShowDropContainer(false);
  }

  const handleDropSuperset = (e, exercise) => {
    e.stopPropagation();
  
    // Get the dragged exercise from dataTransfer if available
    const dataDraggedExercise = JSON.parse(e.dataTransfer.getData("exercise") || null);
  
    const updatedExercises = [...selectedExercises];
    const sourceExercise = updatedExercises.find((ex) => ex.secondaryId === draggedExercise?.secondaryId);
    const targetExercise = updatedExercises.find((ex) => ex.secondaryId === exercise.secondaryId);

    if (targetExercise) {
      // Remove the source exercise from its original position
      if (sourceExercise) {
        updatedExercises.splice(updatedExercises.indexOf(sourceExercise), 1);
      }

      // Move the source exercise into the target exercise's supersetExercises array
      targetExercise.supersetExercises.push(sourceExercise || dataDraggedExercise);
      setSelectedExercises(updatedExercises);
    }
    
    setTargetExerciseId("");
    setDraggedExercise(null);
    setShowDropContainer(false);  
  };

  const handleRemoveExercise = (secondaryId) => {
    setSelectedExercises((prevExercises) => {
      return prevExercises.filter((prevExercise) => {
        if(prevExercise.secondaryId !== secondaryId) {
          return {
            ...prevExercise
          }
        }
      })
    })
  };

  const handleCheck = (exerciseId) => {
    setSelectedExercises((prevExercises) => {
      return prevExercises.map((prevExercise) => {
        if (exerciseId === prevExercise.secondaryId) {
          return {
            ...prevExercise,
            checked: !prevExercise.checked // Toggle the checked value
          };
        }
        return prevExercise;
      });
    });
  }

  return {
    // functions
    handleDrag,
    handleDrop,
    handleDropSuperset,
    handleRemoveExercise,
    handleCheck,
    // states
    draggedExercise,
    targetExerciseId,
    setTargetExerciseId
  }
};