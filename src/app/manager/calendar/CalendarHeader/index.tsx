import PaddedWrapper from "@/components/global/PaddedWrapper";
import { ReactNode } from "react";
import CreateScheduleButton from "./CreateScheduleButton";
import CreateScheduleModal from "./CreateScheduleModal";

interface CalendarHeaderProps {
  month: ReactNode;
  createButton: ReactNode;
  weeksNavigation: ReactNode;
  createScheduleModal: ReactNode;
};

export default function CalendarHeader({
  month,
  createButton,
  weeksNavigation,
  createScheduleModal
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
      {createScheduleModal}
    </PaddedWrapper>
  );
};

CalendarHeader.CreateScheduleModal = CreateScheduleModal;
CalendarHeader.CreateScheduleButton = CreateScheduleButton;