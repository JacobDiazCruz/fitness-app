"use client";

import { combineComponents } from "@/utils/combineComponents"
import { CalendarProvider } from "./useCalendar";

const providers = [
  CalendarProvider
];

const CalendarContextProvider = combineComponents(...providers);
export default CalendarContextProvider;