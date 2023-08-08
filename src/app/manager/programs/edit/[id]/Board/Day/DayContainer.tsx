import { ReactNode } from "react";
import { UseDraggableWorkoutContext } from "@/utils/programTypes";
import DayHeader from "./DayHeader";
import useDraggableWorkout from "@/store/Program/useDraggableWorkout";

interface Props {
  dayIndex: number;
  children: ReactNode;
};

export default function DayContainer({
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
      {children}
    </div>
  );
};

DayContainer.Header = DayHeader;