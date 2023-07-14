import PaddedWrapper from "@/components/global/PaddedWrapper";
import { ReactNode } from "react";

interface CalendarHeaderProps {
  month: ReactNode;
  createButton: ReactNode;
  prevWeekButton: ReactNode;
  nextWeekButton: ReactNode;
};

export default function CalendarHeader({
  month,
  createButton,
  prevWeekButton,
  nextWeekButton
}: CalendarHeaderProps) {
  
  return (
    <PaddedWrapper>
      <div className="calendar-header flex justify-between w-full">
        <div className="flex gap-[30px] items-center">
          {month}
          <div className="relative">
            {createButton}
          </div>
        </div>
        <div>
          {prevWeekButton}
          {nextWeekButton}
        </div>
      </div>
    </PaddedWrapper>
  );
};