import { ReactNode } from "react";
import { AddIcon } from "@/components/global/Icons";
import { primaryTextColor } from "@/utils/themeColors";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";

interface Props {
  dayName: string;
  handleDrop: any;
  setSelectedDayIndex: number;
  handleEditProgramMutation: any;
  dayIndex: number;
  children: ReactNode;
};

export default function DayWrapper({
  dayName,
  handleDrop,
  setSelectedDayIndex,
  handleEditProgramMutation,
  dayIndex,
  children
}: Props) {

  const {
    setShowAddWorkoutModal
  } = useProgramWorkouts();

  return (
    <div
      key={dayIndex}
      data-index={dayIndex}
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e, dayIndex, handleEditProgramMutation)}
      className="day-board md:h-[100vh] dark:border-neutral-800 dark:border dark:border-solid dark:bg-darkTheme-950 bg-[#f7f7f7] w-full p-2 shadow-sm rounded-md"
    >
      <div className="flex justify-between items-center">
        <p className="uppercase text-[12px] text-gray-500 ml-1">{dayName}</p>
        <button
          variant="outlined"
          className="group h-[32px] flex items-center dark:border-neutral-700 border-gray-200 border-solid border rounded-lg px-2"
          onClick={() => {
            setShowAddWorkoutModal(true);
            setSelectedDayIndex(dayIndex);
          }}
        >
          <AddIcon className={`${primaryTextColor} w-3 h-3`} />
          <span className="absolute mt-[60px] z-[99] scale-0 transition-all rounded-lg bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            Add workout
          </span>
        </button>
      </div>
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}