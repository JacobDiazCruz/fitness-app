export interface CalendarItem {
  _id?: string;
  title: string;
  taggedDate: string;
  startTime: DayTime | null;
  endTime: DayTime | null;
  type: 'event' | 'task';
  description: string;
  guests?: any;
};

export interface DayTime {
  name: string,
  hour: string,
  meridiem: "AM" | "PM"
}