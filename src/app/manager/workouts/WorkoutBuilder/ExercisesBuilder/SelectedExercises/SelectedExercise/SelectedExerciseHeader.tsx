import IconButton from "@/components/global/IconButton";
import { TrashIcon } from "@/components/global/Icons";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";
import { IExercise } from "@/types/exercise";
import { borderColor } from "@/utils/themeColors";

export default function SelectedExerciseHeader({
  exercise,
  showCheckInput = true
}: {
  exercise: IExercise;
  showCheckInput?: boolean;
}) {
  const {
    checked,
    name,
    secondaryId,
    videoLink,
    primaryFocus
  } = exercise;

  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  const {
    handleRemoveExercise,
    handleCheck
  } = useExercisesDragController();

  return (
    <div className={`${borderColor} py-5 md:py-2 px-4 dark:bg-darkTheme-950 bg-gray-100 border-b h-auto md:h-[55px] flex justify-between items-center`}>
      <div className="flex gap-[10px] items-center">
        {showCheckInput && (
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={checked}
            onChange={() => handleCheck(secondaryId)}
          />
        )}
        {videoLink && (
          <div className="w-[30%] md:w-[42px] relative overflow-hidden rounded-md cursor-pointer">
            <VideoThumbnail videoUrl={videoLink} />
          </div>
        )}
        <div className="md:flex md:gap-[15px]">
          <p className="dark:text-neutral-50 text-darkTheme-950">
            {name}
          </p>
          <div className={`${handlePrimaryFocusColor(primaryFocus)} w-fit flex items-center md:mt-0 rounded-md text-center px-2 text-[13px]`}>
            {primaryFocus}
          </div> 
        </div>
      </div>
      <IconButton onClick={() => handleRemoveExercise(secondaryId)}>
        <TrashIcon className="w-5 h-5 dark:text-white text-neutral-800" />
      </IconButton>
    </div>
  );
}