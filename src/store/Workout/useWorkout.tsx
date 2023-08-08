'use client';

import { IExercise } from "@/types/exercise";
import { IChildProps } from "@/types/global";
import { ExerciseType, IHandleChangeSetFieldParams, IUseWorkout } from "@/types/workout";
import { useState, createContext, useContext, useMemo, useEffect } from "react";

const WorkoutContext = createContext<IUseWorkout>(
  // @ts-ignore
  null
);

export const initialSet = {
  setType: "",
  reps: null,
  rest: "00:00"
};

export const WorkoutProvider = ({ children }: IChildProps) => {
  const [
    selectedExercises,
    setSelectedExercises
  ] = useState<Array<any>>([]);

  useEffect(() => {
    // Empty the selectedExercises state when component unmounts
    return () => {
      setSelectedExercises([]);
    };
  }, []);

  /**
   * @purpose drops an exercise from "Your Exercises" section to the ExercisesBoard
   * @note N/A
   */
  const onDropFromExercises = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.getData("exercise")) {
      const exercise: IExercise = JSON.parse(e.dataTransfer.getData("exercise"));
      
      // set additional fields for the dropped exercise and update selectedExercises
      // secondaryId: used for having a second unique identifier in case the same Exercise _id is dropped and selected again
      // sets: every exercise should have at least a single set
      const exercisesList = [...selectedExercises, {
        ...exercise,
        secondaryId: Math.random(),
        sets: [initialSet]
      }];
      setSelectedExercises(exercisesList);
    }
  };

  /**
   * @purpose to merge exercises into a superset
   * @note N/A
   */
  const handleMergeSuperset = () => {
    const checkedItems = selectedExercises.filter((exercise) => exercise.checked);
  
    if (checkedItems.length > 0) {
      const firstCheckedItem = checkedItems[0];
  
      const updatedExercises = selectedExercises.reduce((acc, exercise, index) => {
        if (exercise === firstCheckedItem) {
          // Replace the first checked item with the new object
          acc.push({
            _id: Math.random().toString(),
            secondaryId: Math.random().toString(),
            name: `Superset ${index}`,
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

  /**
   * @purpose to unmerge exercises from a superset
   * @note N/A
   */
  const handleUnmergeSuperset = (exerciseSecondaryId: string) => {
    // 1. filter all the checked supersets
    const selectedSupersets = selectedExercises.filter((exercise) => {
      if(exerciseSecondaryId === exercise.secondaryId && exercise.supersetExercises.length > 0) {
        return exercise
      }
    });

    // 2. Unmerge all exercises from the current "checked" superset
    const unmergedExercises = selectedExercises.map(exercise => {
      if (exercise.supersetExercises) {
        return exercise.supersetExercises;
      } else {
        return [];
      }
    }).flat();

    const filteredExercises = selectedSupersets.flatMap((selectedSuperset) =>
      selectedExercises.filter((exercise) => exercise.secondaryId !== selectedSuperset.secondaryId)
    );
    
    // 3. setState
    setSelectedExercises([...filteredExercises, ...unmergedExercises]);
  };

  /**
   * @purpose To push the next exercise from the superset's exercises
   * @note N/A
   */
  const hookNewExerciseToSuperset = (
    hookType: "next" | "prev",
    exerciseSecondaryId: string,
    supersetIndex: number
  ) => {
    const clonedSelectedExercises = [...selectedExercises];
    const selectedSupersetIndex = clonedSelectedExercises.findIndex(
      (exercise) => exercise.secondaryId === exerciseSecondaryId
    );

    if (selectedSupersetIndex === -1) return;

    const selectedSuperset = clonedSelectedExercises[selectedSupersetIndex];
    
    if (selectedSuperset && hookType === "prev") {
      const prevExerciseIndex = supersetIndex - 1;
      const prevExercise = clonedSelectedExercises.splice(prevExerciseIndex, 1)[0];
      selectedSuperset.supersetExercises.unshift(prevExercise);
    }
    
    if (selectedSuperset && hookType === "next") {
      const nextExerciseIndex = supersetIndex + 1;
      const nextExercise = clonedSelectedExercises.splice(nextExerciseIndex, 1)[0];
      selectedSuperset.supersetExercises.push(nextExercise);
    }

    setSelectedExercises(clonedSelectedExercises);
  };
  
  /**
   * @purpose to add a new exercise set
   * @note Observe the difference on setting a state between a normal and a superset type of exercises.
   * @param {string} exerciseType - The type of exercise ('normal' or 'superset').
   * @param {number} index - The index of the exercise in the selectedExercises array.
   * @param {number} supersetIndex - (Only applicable for 'superset' exerciseType) The index of the superset exercise in the selectedExercises[index].supersetExercises array.
   */
  const handleAddExerciseSet = (
    exerciseType: ExerciseType,
    index: number, 
    supersetIndex: number
  ) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      if(exerciseType === "normal") {
        updatedExercises[index].sets.push(initialSet);
      } else {
        updatedExercises[index].supersetExercises[supersetIndex].sets.push(initialSet);
      }
      return updatedExercises;
    });
  };

  /**
   * @purpose to update the "set" field's value
   * @note N/A
   */
  const handleChangeSetField = ({
    value,
    field,
    supersetExerciseIndex = 0,
    exerciseIndex = 0,
    setIndex = 0
  }: IHandleChangeSetFieldParams) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      const exercise = updatedExercises[exerciseIndex];

      if (exercise.supersetExercises && exercise.supersetExercises.length > 0) {
        const supersetExercise = exercise.supersetExercises[supersetExerciseIndex];
        const updatedSets = [...supersetExercise.sets];
        updatedSets[setIndex] = {
          ...updatedSets[setIndex],
          [field]: value
        };
        supersetExercise.sets = updatedSets;
      } else {
        const updatedSets = [...exercise.sets];
        updatedSets[setIndex] = {
          ...updatedSets[setIndex],
          [field]: value
        };
        exercise.sets = updatedSets;
      }

      return updatedExercises;
    });
  };


  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      setSelectedExercises,
      onDropFromExercises,
      handleMergeSuperset,
      handleUnmergeSuperset,
      handleAddExerciseSet,
      handleChangeSetField,
      hookNewExerciseToSuperset,
      selectedExercises
    }
  }, [
    setSelectedExercises,
    onDropFromExercises,
    handleMergeSuperset,
    handleUnmergeSuperset,
    handleAddExerciseSet,
    handleChangeSetField,
    hookNewExerciseToSuperset,
    selectedExercises
  ])

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkout = () => {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within workout context")
  }
  return context;
}

export default useWorkout;