import useWorkout from "@/store/Workout/useWorkout";
import { IExercise } from "@/types/exercise";
import { useState } from "react";

export default function useExercisesDragController() {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  const [targetExerciseId, setTargetExerciseId] = useState("");

  const handleDragEnter = (
    e: any, 
    exerciseIndex: number, 
    draggedExercise: IExercise | null
  ) => {
    e.preventDefault();
    const targetIndex = selectedExercises.indexOf(draggedExercise);

    if (targetIndex !== -1) {
      const updatedArr = [...selectedExercises];
      updatedArr.splice(targetIndex, 1);
      updatedArr.splice(exerciseIndex, 0, draggedExercise);

      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: updatedArr
      });
    }
  };

  const handleSupersetDragEnter = (
    e: any, 
    exerciseIndex: number, 
    draggedExercise: IExercise | null
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const targetIndex = selectedExercises.indexOf(draggedExercise);

    if (targetIndex !== -1) {
      const updatedArr = [...selectedExercises];
      updatedArr.splice(targetIndex, 1);
      updatedArr.splice(exerciseIndex, 0, draggedExercise);
      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: updatedArr
      });
    }
  }

  const handleDropSuperset = (e: any, exercise: IExercise) => {
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
      
      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: updatedExercises
      });
    }
    
    setTargetExerciseId("");
    // setDraggedExercise(null);
    // setShowDropContainer(false);  
  };

  const handleRemoveExercise = (secondaryId: string) => {
    const selectedExercisesCopy = [...selectedExercises];
    const updatedSelectedExercises = selectedExercisesCopy.filter((prevExercise) => {
      if(prevExercise.secondaryId !== secondaryId) {
        return {
          ...prevExercise
        }
      }
    })

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: updatedSelectedExercises
    });
  };

  const handleCheck = (secondaryId: string) => {
    const selectedExercisesCopy = [...selectedExercises];
    const updatedSelectedExercises = selectedExercisesCopy.map((prevExercise) => {
      console.log("secondaryId", secondaryId)
      if (secondaryId === prevExercise.secondaryId) {
        return {
          ...prevExercise,
          checked: !prevExercise.checked // Toggle the checked value
        };
      }
      return prevExercise;
    });

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: updatedSelectedExercises
    });

    // setSelectedExercises((prevExercises) => {
    //   return prevExercises.map((prevExercise) => {
    //     if (exerciseId === prevExercise.secondaryId) {
    //       return {
    //         ...prevExercise,
    //         checked: !prevExercise.checked // Toggle the checked value
    //       };
    //     }
    //     return prevExercise;
    //   });
    // });
  }

  return {
    // functions
    handleDropSuperset,
    handleSupersetDragEnter,
    handleRemoveExercise,
    handleCheck,
    handleDragEnter,
    // states
    targetExerciseId,
    setTargetExerciseId
  }
};