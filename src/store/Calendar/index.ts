'use client';

import { combineComponents } from "@/utils/combineComponents"
import { CalendarProvider } from "./useCalendar";
import { CalendarScheduleBuilderProvider } from "./useCalendarScheduleBuilder";

const providers = [
  CalendarProvider,
  CalendarScheduleBuilderProvider,
];

const CalendarContextProvider = combineComponents(...providers);
export default CalendarContextProvider;