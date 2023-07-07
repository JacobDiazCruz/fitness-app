import Button from "@/components/global/Button";
import { CubeTransparentIcon, ViewFinderIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";
import { secondaryBgColor } from "@/utils/themeColors";

export default function ExercisesActionButtons() {
  const {
    handleMergeSuperset
  } = useWorkout();

  return (
    <div className={`${secondaryBgColor} sticky top-[49px] dark:border-neutral-800 border-gray-200 btn-actions flex items-center md:-top-[0] h-[70px] z-[100] border-b border-b-solid shadow-sm`}>
      <Button
        variant="outlined"
        className="mr-2"
        startIcon={<CubeTransparentIcon />}
        onClick={() => handleMergeSuperset()}
      >
        Merge Superset
      </Button>
      <Button
        variant="outlined"
        startIcon={<ViewFinderIcon />}
      >
        Make Circuit
      </Button>
    </div>
  );
};