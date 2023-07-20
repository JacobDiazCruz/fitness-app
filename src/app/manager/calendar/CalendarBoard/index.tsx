import React, { ReactNode } from "react";
import CalendarDate from "./CalendarDate";
import CalendarSchedule from "./CalendarSchedule";
import CalendarTimesList from "./CalendarTimesList";

interface Props {
  calendarDate: ReactNode;
  timesList: ReactNode;
  children: ReactNode;
};
export default function CalendarBoard({
  calendarDate,
  timesList,
  children
}: Props) {

  return (
    <div className="flex h-fit relative">
      <div>
        {timesList}
      </div>
      <div className="calendar-schedule-board w-full relative">
        <ul className="flex w-full absolute h-full">
          {calendarDate}
        </ul>
        <div className="flex absolute h-full w-full mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

CalendarBoard.Schedule = CalendarSchedule;
CalendarBoard.Date = CalendarDate;
CalendarBoard.TimesList = CalendarTimesList;