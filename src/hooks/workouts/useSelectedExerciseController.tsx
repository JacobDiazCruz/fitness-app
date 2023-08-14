import useWorkout from "@/store/Workout/useWorkout";
import { ExerciseType, IExercise } from "@/types/exercise";
import { IHandleChangeSetFieldParams } from "@/types/workout";

export const initialSet = {
  setType: "",
  reps: null,
  time: null,
  rest: "00:00",
  status: "PENDING"
};

export default function useSelectedExerciseController() {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  /**
   * @purpose to unmerge exercises from a superset
   * @note N/A
   */
  const handleUnmergeSuperset = (exerciseSecondaryId: string) => {
    // 1. filter all the checked supersets
    const selectedSupersets = selectedExercises.filter((exercise: IExercise) => {
      if(exerciseSecondaryId === exercise.secondaryId && exercise.supersetExercises.length > 0) {
        return exercise
      }
    });

    // 2. Unmerge all exercises from the current "checked" superset
    const unmergedExercises = selectedExercises.map((exercise: IExercise) => {
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
    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: [...filteredExercises, ...unmergedExercises]
    });
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

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: clonedSelectedExercises
    });
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
    let selectedExercisesCopy = [...selectedExercises];
    if(exerciseType === "normal") {
      selectedExercisesCopy[index].sets.push(initialSet);
    } else {
      selectedExercisesCopy[index].supersetExercises[supersetIndex].sets.push(initialSet);
    }

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: selectedExercisesCopy
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
    circuitExerciseIndex = 0,
    exerciseIndex = 0,
    setIndex = 0
  }: IHandleChangeSetFieldParams) => {
    // dispatch({
    //   type: "ADD_SELECTED_EXERCISE",
    //   data: 
    // })
    // setSelectedExercises((prevExercises) => {
    //   const updatedExercises = [...prevExercises];
    //   const exercise = updatedExercises[exerciseIndex];

    //   let updatedSets = [];
    //   if (exercise.supersetExercises && exercise.supersetExercises.length > 0) {
    //     const supersetExercise = exercise.supersetExercises[supersetExerciseIndex];
    //     updatedSets = [...supersetExercise.sets];
    //     supersetExercise.sets = updatedSets;
    //   } else if (exercise.circuitExercises && exercise.circuitExercises.length > 0) {
    //     const circuitExercise = exercise.circuitExercises[circuitExerciseIndex];
    //     updatedSets = [...circuitExercise.sets];
    //     circuitExercise.sets = updatedSets;
    //   } else {
    //     updatedSets = [...exercise.sets];
    //     exercise.sets = updatedSets;
    //   }

    //   updatedSets[setIndex] = {
    //     ...updatedSets[setIndex],
    //     [field]: value
    //   };

    //   return updatedExercises;
    // });
  };

  return {
    handleUnmergeSuperset,
    hookNewExerciseToSuperset,
    handleAddExerciseSet,    
    handleChangeSetField
  }
}