import useWorkout from "@/store/Workout/useWorkout";
import { ExerciseType, IExercise } from "@/types/exercise";

export const initialSet = {
  setType: "",
  reps: null,
  time: "00:00",
  rest: "00:00",
  status: "PENDING"
};

export default function useSelectedExerciseController() {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  /**
   * @purpose to unmerge exercises from a superset or circuit exercise
   */
  const handleUnmergeGroupExercise = ({
    exerciseSecondaryId,
    groupField
  }: {
    exerciseSecondaryId: string,
    groupField: "supersetExercises" | "circuitExercises"
  }) => {
    // 1. filter all the checked supersets
    const selectedSupersets = selectedExercises.filter((exercise: IExercise) => {
      if(exerciseSecondaryId === exercise.secondaryId && exercise[groupField].length > 0) {
        return exercise;
      }
    });

    // 2. Unmerge all exercises from the current "checked" superset
    const unmergedExercises = selectedExercises.map((exercise: IExercise) => {
      if (exercise[groupField]) {
        return exercise[groupField];
      } else {
        return [];
      }
    }).flat();

    const filteredExercises = selectedSupersets.flatMap((selectedSuperset) =>
      selectedExercises.filter((exercise: IExercise) => {
        return exercise.secondaryId !== selectedSuperset.secondaryId
      })
    );
    
    // 3. setState
    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: [...filteredExercises, ...unmergedExercises]
    });
  };

  /**
   * @purpose To push the next exercise from superset or circuit exercise set
   * @note N/A
   */
   const hookNewExerciseToGroupExercise = (
    hookType: "next" | "prev",
    exerciseSecondaryId: string,
    exerciseIndex: number,
    field: "supersetExercises" | "circuitExercises"
  ) => {
    const clonedSelectedExercises = [...selectedExercises];
    const selectedGroupIndex = clonedSelectedExercises.findIndex(
      (exercise) => exercise.secondaryId === exerciseSecondaryId
    );

    if (selectedGroupIndex === -1) return;

    const selectedGroup = clonedSelectedExercises[selectedGroupIndex];
    
    if (selectedGroup && hookType === "prev") {
      const prevExerciseIndex = exerciseIndex - 1;
      const prevExercise = clonedSelectedExercises.splice(prevExerciseIndex, 1)[0];
      selectedGroup[field].unshift(prevExercise);
    }
    
    if (selectedGroup && hookType === "next") {
      const nextExerciseIndex = exerciseIndex + 1;
      const nextExercise = clonedSelectedExercises.splice(nextExerciseIndex, 1)[0];
      selectedGroup[field].push(nextExercise);
    }

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: clonedSelectedExercises
    });
  };

  /**
   * @purpose to add a new exercise set
   * @note REFACTOR THE SWITCH CASE TO HANDLE A MORE DYNAMIC EXERCISE TYPE
   * @param {string} exerciseType - The type of exercise (normal, superset or circuit).
   * @param {number} index - The index of the exercise in the selectedExercises array.
   * @param {number} supersetIndex - (Only applicable for 'superset' exerciseType) The index of the superset exercise in the selectedExercises[index].supersetExercises array.
   */
   const handleAddExerciseSet = (
    exerciseType: ExerciseType,
    index: number,
    supersetIndex: number,
    circuitIndex: number
  ) => {
    let selectedExercisesCopy = [...selectedExercises];

    switch(exerciseType) {
      case "superset":
        selectedExercisesCopy[index].supersetExercises[supersetIndex].sets.push(initialSet);
        break;
      case "circuit":
        selectedExercisesCopy[index].circuitExercises[circuitIndex].sets.push(initialSet);
        break;
      default:
        selectedExercisesCopy[index].sets.push(initialSet);
        break;
    }

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: selectedExercisesCopy
    });
  };

  return {
    handleUnmergeGroupExercise,
    hookNewExerciseToGroupExercise,
    handleAddExerciseSet 
  }
}