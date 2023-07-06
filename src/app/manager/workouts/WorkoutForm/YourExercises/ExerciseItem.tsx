import { DragIcon } from "@/components/global/Icons";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { borderColor, fieldBgColor, primaryBgColor } from "@/utils/themeColors";

interface Props {
  exercise: Exercise;
  handleDragStart: any;
  handleClickExercise: any;
};

export default function ExerciseItem({
  exercise,
  handleDragStart,
  handleClickExercise
}: Props) {
  const { files, primaryFocus, name, videoLink } = exercise || {};
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
  
  const PrimaryFocus = () => {
    return (
      <div className={`${handlePrimaryFocusColor(primaryFocus)} font-medium rounded-md mt-1 text-center px-2 text-[11px] h-[18px]`}>
        {primaryFocus}
      </div>
    );
  };

  return (
    <div
      onDragStart={handleDragStart}
      onClick={handleClickExercise}
      draggable
      className={`
        ${primaryBgColor}
        ${exercise?.isSelected ? 'border-blue-500' : 'dark:border-neutral-700'}
        border cursor-grab p-2 hover:bg-[#ebebeb] flex items-center rounded-lg mb-3 gap-[12px] h-[83px]
      `}
    >
      <div className="dark:bg-darkTheme-950 bg-gray-600 rounded-sm flex items-center w-[35%] h-full overflow-hidden relative">
        {videoLink && (
          <div className="w-full relative overflow-hidden rounded-md cursor-pointer">
            <VideoThumbnail
              videoUrl={videoLink}
            />
          </div>
        )}
      </div>
      <div className="pr-3 w-[60%]">
        <p className="dark:text-neutral-50 text-darkTheme-950 text-[14px]">
          {name}
        </p>
        <div className="flex">
          <PrimaryFocus />
        </div>
      </div>
      <div className="pr-2">
        <DragIcon className="w-5 h-5 fill-[#c8c8c8] hidden md:block" />

        {/* Check button */}
        <div 
          className={`
            ${borderColor}
            block md:hidden
            w-5 h-5 border rounded-full
            ${exercise?.isSelected && 'bg-blue-500'}
          `}
        >
        </div>
      </div>
    </div>
  );
};