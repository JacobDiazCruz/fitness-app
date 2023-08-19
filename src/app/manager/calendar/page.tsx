"use client";

import { CalendarScheduleFormProvider } from "@/store/Calendar/useCalendarScheduleForm";
import CalendarContextProvider from "@/store/Calendar";
import Calendar from "./Calendar";

export default function CalendarPage() {
  return (
    <CalendarContextProvider>
      <CalendarScheduleFormProvider>
        <Calendar />
      </CalendarScheduleFormProvider>
    </CalendarContextProvider>
  );
}