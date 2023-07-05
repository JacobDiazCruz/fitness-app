'use client';

import { useState, createContext, useReducer, useContext, useMemo, useEffect, useCallback } from "react";
import useProgram from "./useProgram";

const DraggableWorkoutContext = createContext();

export const DraggableWorkoutProvider = ({ children }) => {
  // program hook
  const {
    programDays,
    setProgramDays,
    handleEditProgramMutation
  } = useProgram();

  // draggable state
  const [draggedWorkout, setDraggedWorkout] = useState<any>(null);

  // drag enter event
  const onDragEnter = ((e, workout, index, dayIndex) => {
    e.preventDefault();

    const targetIndex = programDays[dayIndex]?.workouts.findIndex(
      workout => workout.secondaryId === draggedWorkout?.secondaryId
    );

    if (targetIndex !== -1) {
      const updatedArr = [...programDays];
      const workoutsArr = [...updatedArr[dayIndex]?.workouts];
  
      workoutsArr.splice(targetIndex, 1);
      workoutsArr.splice(index, 0, draggedWorkout);

      updatedArr[dayIndex].workouts = workoutsArr;
      setProgramDays(updatedArr);
    }
  });

  // Draggable workout's drop event
  // functions: remove, add, and mutate request
  const onDropWorkout = async (e, dayIndex) => {
    e.preventDefault();
    const draggedWorkoutData = JSON.parse(e.dataTransfer.getData("application/json"));
    if (draggedWorkoutData) {
      const { prevDayIndex, prevWorkoutIndex, workout } = draggedWorkoutData;
      if(prevDayIndex !== dayIndex) {
        await removeDraggedWorkout(prevDayIndex, workout);
        await addDroppedWorkout(dayIndex, workout);
        await handleEditProgramMutation();
      }
    }
  };

  // Remove dragged workout from its previous day and index
  const removeDraggedWorkout = useCallback((prevDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const filteredWorkouts = cloneProgramDays[prevDayIndex].workouts.filter((wk) => wk.secondaryId !== workout.secondaryId)
      cloneProgramDays[prevDayIndex].workouts = filteredWorkouts;
      return cloneProgramDays;
    });
  }, []);

  // Add dragged workout to the designated day
  const addDroppedWorkout = useCallback((currentDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[currentDayIndex].workouts.push(workout);
      return cloneProgramDays;
    });
  }, []);
  
  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      draggedWorkout,
      setDraggedWorkout,
      onDropWorkout,
      onDragEnter
    }
  }, [
    draggedWorkout,
    setDraggedWorkout,
    onDropWorkout,
    onDragEnter
  ])

  return (
    <DraggableWorkoutContext.Provider value={value}>
      {children}
    </DraggableWorkoutContext.Provider>
  );
};

const useDraggableWorkout = () => {
  const context = useContext(DraggableWorkoutContext)
  if (context === undefined) {
    throw new Error("useDraggableWorkout must be used within workout context")
  }
  return context;
};

export default useDraggableWorkout;