import { DayTime } from "@/utils/calendarTypes";
import { SetStateAction } from "react";

type CalendarSessionType = "Session" | "Event" | "Workout" | "Program";

interface ICalendarSchedule {
  _id?: string;
  type: CalendarSessionType;
  title: string;
  description?: string;
  taggedDate: string;
  startTime: DayTime;
  endTime: DayTime;
  guests: any;
  createdAt: string;
  updatedAt: string;
};

interface IUseCalendarContext {
  dates: string[];
  dayTimes: any;
  setDates: Dispatch<SetStateAction<string[]>>;
  startDate: Date;
  timesList: string[];
  setStartDate: Dispatch<SetStateAction<Date>>;
  refetchCalendarSchedules: any;
  calendarSchedules: ICalendarSchedule[];
  generateTimeList: () => void;
}

interface IUseCalendarScheduleForm {
  dates: string[];
  dayTimes: any;
  setDates: Dispatch<SetStateAction<string[]>>;
  startDate: Date;
  timesList: string[];
  setStartDate: Dispatch<SetStateAction<Date>>;
  refetchCalendarSchedules: any;
  calendarSchedules: ICalendarSchedule[];
  generateTimeList: () => void;
}