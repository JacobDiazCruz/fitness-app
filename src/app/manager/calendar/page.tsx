"use client";

import CalendarContextProvider from "@/store/Calendar";
import Calendar from "./Calendar";

export default function CalendarPage() {
  return (
    <CalendarContextProvider>
      <Calendar />
    </CalendarContextProvider>
  );
}