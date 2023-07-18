import { ReactNode } from "react";
import CalendarDate from "./CalendarDate";
import CalendarSchedule from "./CalendarSchedule";
import CalendarTimesList from "./CalendarTimesList";

interface Props {
  calendarDate: ReactNode;
  children: ReactNode;
};
export default function CalendarBoard({
  calendarDate,
  children
}: Props) {
  return (
    <div className="overflow-hidden">
      <div className="pr-9 pl-[100px]">
        <ul className="flex w-full">
          {calendarDate}
        </ul>
      </div>
      
      <div className="calendar-schedule-board flex relative h-full mt-5">
        {children}
      </div>
    </div>
  );
};

CalendarBoard.Schedule = CalendarSchedule;
CalendarBoard.Date = CalendarDate;
CalendarBoard.TimesList = CalendarTimesList;