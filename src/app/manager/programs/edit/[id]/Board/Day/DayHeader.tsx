import { AddIcon } from "@/components/global/Icons";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import { UseProgramWorkoutsContext } from "@/utils/programTypes";
import { primaryTextColor } from "@/utils/themeColors";

interface Props {
  dayName: string;
  dayIndex: number;
  dayCount: number;
};

export default function DayHeader({
  dayName,
  dayIndex,
  dayCount
}: Props) {
  const {
    setShowAddWorkoutModal,
    setSelectedDayIndex,
    setSelectedDayCount
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  return (
    <div className="flex justify-between items-center">
      <p className="uppercase text-[12px] text-gray-500 ml-1">
        {dayName}
      </p>
      <button
        className="group h-[32px] flex items-center dark:border-neutral-700 border-gray-200 border-solid border rounded-lg px-2"
        onClick={() => {
          setShowAddWorkoutModal?.(true);
          setSelectedDayIndex?.(dayIndex);
          setSelectedDayCount?.(dayCount);
        }}
      >
        <AddIcon className={`${primaryTextColor} w-3 h-3`} />
        <span className="absolute mt-[60px] z-[99] scale-0 transition-all rounded-lg bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          Add workout
        </span>
      </button>
    </div>
  );
};