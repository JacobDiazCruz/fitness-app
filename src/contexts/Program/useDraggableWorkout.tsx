'use client';

import { UseProgramWorkoutsContext } from "@/utils/programTypes";
import { useState, createContext, useReducer, useContext, useMemo, useEffect, useCallback } from "react";
import useProgram from "./useProgram";
import useProgramWorkouts from "./useProgramWorkouts";

const DraggableWorkoutContext = createContext();

export const DraggableWorkoutProvider = ({ children }) => {
  // program hook
  const {
    programDays,
    setProgramDays,
    handleEditProgramMutation
  } = useProgram();

  const { 
    programWorkouts,
    setProgramWorkouts,
    editProgramWorkoutMutation
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  // draggable state
  const [draggedWorkout, setDraggedWorkout] = useState<any>(null);

  // drag enter event
  const onDragEnter = ((e, workoutIndex, dayIndex) => {
    e.preventDefault();

    const targetIndex = programDays[dayIndex].workouts.findIndex(
      workout => workout._id === draggedWorkout?._id
    );

    if (targetIndex !== -1) {
      const updatedArr = [...programDays];
      const workoutsArr = [...updatedArr[dayIndex]?.workouts];

      workoutsArr.splice(targetIndex, 1);
      workoutsArr.splice(workoutIndex, 0, draggedWorkout);

      editProgramWorkoutMutation.mutateAsync({
        id: draggedWorkout._id,
        data: {
          ...draggedWorkout,
          programDetails: {
            ...draggedWorkout.programDetails,
            positionIndex: targetIndex
          }
        }
      });

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
      const filteredWorkouts = cloneProgramDays[prevDayIndex].workouts.filter((wk) => wk._id !== workout._id);

      cloneProgramDays[prevDayIndex].workouts = filteredWorkouts;
      return cloneProgramDays;
    });
  }, []);

  // Add dragged workout to the designated day
  const addDroppedWorkout = useCallback((currentDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      console.log("prevProgramDays", prevProgramDays)
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