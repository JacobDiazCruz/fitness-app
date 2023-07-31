"use client";

import CalendarContextProvider from "@/contexts/Calendar";
import Calendar from "./Calendar";

export default function CalendarPage() {
  return (
    <CalendarContextProvider>
      <Calendar />
    </CalendarContextProvider>
  );
};