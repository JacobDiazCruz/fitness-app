import { useState, createContext, useReducer, useContext, useMemo, useEffect } from "react";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [
    selectedExercises,
    setSelectedExercises
  ] = useState<Array<any>>([]);

  const updateSelectedExercises = (data) => {
    setSelectedExercises(data)
  };

  useEffect(() => {
    // Empty the selectedExercises state when component unmounts
    return () => {
      setSelectedExercises([]);
    };
  }, []);

  /**
   * @Purpose drops an exercise from "Your Exercises" section to the ExercisesBoard
   * @Note N/A
   */
  const onDropFromExercises = (e) => {
    if (e.dataTransfer.getData("exercise")) {
      const exercise: Exercise = JSON.parse(e.dataTransfer.getData("exercise"));

      // set additional fields for the dropped exercise and update selectedExercises
      // - secondaryId: used for having a second unique identifier in case the same Exercise _id is dropped and selected again
      // - sets: every exercise should have at least a single set
      const exercisesList = [...selectedExercises, {
        ...exercise,
        secondaryId: Math.random(),
        sets: [
          {
            setType: "",
            reps: null,
            rest: null
          }
        ]
      }];
      updateSelectedExercises(exercisesList);
    }
  };

  /**
   * @Purpose to merge exercises into a superset
   * @Note N/A
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
   * @Purpose to unmerge exercises from a superset
   * @Note N/A
   */
  const handleUnmergeSuperset = () => {
    // 1. filter all the checked supersets
    const checkedSupersets = selectedExercises.filter((exercise) => {
      if(exercise.checked && exercise.supersetExercises.length > 0) {
        return exercise
      }
    });

    // 2. Unmerge all exercises from the current "checked" superset
    const unmergedExercises = checkedSupersets.map(exercise => {
      return exercise.supersetExercises;
    }).flat();
    const filteredExercises = checkedSupersets.flatMap((checkedSuperset) =>
      selectedExercises.filter((exercise) => exercise.secondaryId !== checkedSuperset.secondaryId)
    );
    // 3. setState
    setSelectedExercises([...filteredExercises, ...unmergedExercises]);
  };

  /**
   * @Purpose to add a new exercise set
   * @Note Observe the difference on setting a state between a normal and a superset type of exercises.
   */
  const handleAddExerciseSet = (exerciseType: string, index: number, supersetIndex: number) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      if(exerciseType === "normal") {
        updatedExercises[index].sets.push({
          setType: "",
          reps: null,
          rest: null
        });
      } else {
        updatedExercises[index].supersetExercises[supersetIndex].sets.push({
          setType: "",
          reps: null,
          rest: null
        });
      }
      return updatedExercises;
    });
  };

  const handleChangeSetField = ({value, field, exerciseIndex, setIndex}) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[exerciseIndex].sets[setIndex][field] = value
      return updatedExercises;
    });
  };

  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      updateSelectedExercises,
      onDropFromExercises,
      handleMergeSuperset,
      handleUnmergeSuperset,
      handleAddExerciseSet,
      handleChangeSetField,
      selectedExercises
    }
  }, [
    updateSelectedExercises,
    onDropFromExercises,
    handleMergeSuperset,
    handleUnmergeSuperset,
    handleAddExerciseSet,
    handleChangeSetField,
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