import Button from "@/components/global/Button";
import { CubeTransparentIcon, ViewFinderIcon } from "@/components/global/Icons";
import useWorkout from "@/store/Workout/useWorkout";
import { IExercise } from "@/types/exercise";
import { secondaryBgColor } from "@/utils/themeColors";

export default function ExercisesActionButtons() {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  /**
   * @purpose to merge exercises into a superset or circuit
   * @params exerciseTypeKey
   * @note N/A
   */
  const handleMergeExercise = (exerciseTypeKey: string) => {
    const checkedItems = selectedExercises.filter((exercise: IExercise) => exercise.checked);

    // console.log("selectedExercises", selectedExercises);
  
    if (checkedItems.length > 0) {
      const firstCheckedItem = checkedItems[0];
      const updatedExercises = selectedExercises.reduce((acc: any, exercise: IExercise, index: number) => {
        if (exercise === firstCheckedItem) {
          // Replace the first checked item with the new object
          acc.push({
            _id: Math.random().toString(),
            secondaryId: Math.random().toString(),
            name: `Superset ${index}`,
            checked: false,
            primaryFocus: "",
            category: "",
            [exerciseTypeKey]: checkedItems
          });
        } else if (!checkedItems.includes(exercise)) {
          // Exclude the other checked items
          acc.push(exercise);
        }
        return acc;
      }, []);

      console.log("updatedExercises", updatedExercises)

      dispatch({
        type: "SET_SELECTED_EXERCISES",
        data: updatedExercises
      });
    }
  };

  return (
    <div className={`${secondaryBgColor} sticky top-[49px] dark:border-neutral-800 border-gray-200 btn-actions flex items-center md:-top-[0] h-[70px] z-[100] border-b border-b-solid shadow-sm`}>
      <Button
        variant="outlined"
        className="mr-2"
        startIcon={<CubeTransparentIcon />}
        onClick={() => handleMergeExercise("supersetExercises")}
      >
        Merge Superset
      </Button>
      <Button
        variant="outlined"
        startIcon={<ViewFinderIcon />}
        onClick={() => handleMergeExercise("circuitExercises")}
      >
        Make Circuit
      </Button>
    </div>
  );
}