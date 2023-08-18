import IconButton from "@/components/global/IconButton";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";
import { IExercise } from "@/types/exercise";
import { borderColor, secondaryTextColor } from "@/utils/themeColors";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SelectedExerciseHeader({
  exercise,
  showCheckInput = true,
  handleEditSets
}: {
  exercise: IExercise;
  showCheckInput?: boolean;
  handleEditSets: () => void;
}) {
  const {
    checked,
    name,
    secondaryId = "",
    videoLink,
    primaryFocus
  } = exercise;

  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const settingsRef: any = useOutsideClick(() => setIsDropdownOpen(false));
  
  const {
    handleRemoveExercise,
    handleCheck
  } = useExercisesDragController();

  return (
    <div className={`${borderColor} cursor-grab py-5 md:py-2 px-4 dark:bg-darkTheme-950 bg-gray-100 border-b h-auto md:h-[55px] flex justify-between items-center`}>
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

      {/* Settings Icon and Menu */}
      <div ref={settingsRef} className="flex items-center cursor-pointer">
        <IconButton
          onClick={() => setIsDropdownOpen(prev => !prev)}
          className="text-left"
        >
          <BsThreeDotsVertical className={`${secondaryTextColor} w-5 h-5`} />
        </IconButton>
        {isDropdownOpen && (
          <div className="dropdown bg-white dark:bg-darkTheme-950 dark:border dark:border-neutral-800 dark:-style w-[150px] ml-[-140px] absolute z-[999] mt-[150px] shadow-md rounded-md">
            <ul className="py-2 text-sm text-gray-700 dark:text-neutral-50" aria-labelledby="dropdownDefaultButton">
              <li 
                onClick={() => {
                  handleEditSets();
                  setIsDropdownOpen(false);
                }}
              >
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900">
                  Edit sets
                </div>
              </li>
              <li onClick={() => handleRemoveExercise(secondaryId)}>
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900">
                  Delete
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}