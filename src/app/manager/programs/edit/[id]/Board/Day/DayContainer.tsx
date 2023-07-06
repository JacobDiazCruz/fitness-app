import { ReactNode } from "react";
import { UseDraggableWorkoutContext } from "@/utils/programTypes";
import DayHeader from "./DayHeader";
import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";

interface Props {
  header: ReactNode;
  dayIndex: number;
  children: ReactNode;
};

export default function DayContainer({
  header,
  dayIndex,
  children
}: Props) {

  const {
    onDropWorkout
  }: UseDraggableWorkoutContext = useDraggableWorkout()!;

  return (
    <div
      key={dayIndex}
      data-index={dayIndex}
      onDragOver={e => e.preventDefault()}
      onDrop={e => onDropWorkout?.(e, dayIndex)}
      className="day-board md:h-[100vh] dark:border-neutral-800 dark:border dark:border-solid dark:bg-darkTheme-950 bg-[#f7f7f7] w-full p-2 shadow-sm rounded-md"
    >
      {header}
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
};

DayContainer.Header = DayHeader;