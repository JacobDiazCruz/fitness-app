import PaddedWrapper from "@/components/global/PaddedWrapper";
import { ReactNode } from "react";
import CreateScheduleModal from "../CreateScheduleModal";
import CreateScheduleButton from "./CreateScheduleButton";

interface CalendarHeaderProps {
  month: ReactNode;
  createButton: ReactNode;
  weeksNavigation: ReactNode;
};

export default function CalendarHeader({
  month,
  createButton,
  weeksNavigation
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
          {weeksNavigation}
        </div>
      </div>
    </PaddedWrapper>
  );
};

CalendarHeader.CreateScheduleButton = CreateScheduleButton;