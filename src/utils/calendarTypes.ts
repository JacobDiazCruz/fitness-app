export interface CalendarScheduleType {
  _id?: string;
  title?: string;
  taggedDate: string;
  startTime?: DayTime | null;
  endTime?: DayTime | null;
  type: CalendarScheduleTypeFieldValues;
  description?: string;
  workoutDetails?: any;
  guests?: any;
};

export interface DayTime {
  name: string,
  hour: string,
  meridiem: "AM" | "PM"
}

export type CalendarScheduleTypeFieldValues = 'Event' | 'Task' | 'Workout' | 'Program';