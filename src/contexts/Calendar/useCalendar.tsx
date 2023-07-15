import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import { primaryTextColor } from "@/utils/themeColors";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";

const CalendarContext = createContext(null);

export const CalendarProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [dates, setDates] = useState([]);

  const {
    data: calendarSchedules,
    refetch: refetchCalendarSchedules
  } = useQuery('calendarSchedules', () => listWeeklyCalendarSchedules(JSON.stringify(dates)), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(0);
      times.push(time);
    }
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return times.map((time) => (
      <li key={time} className={`${primaryTextColor} h-[100px] relative text-[14px]`}>
        {time.toLocaleTimeString('en-US', options)}
      </li>
    ));
  };

  const value = {
    dates,
    setDates,
    refetchCalendarSchedules,
    calendarSchedules,
    generateTimeList
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error("useCalendar must be used within useCalendar context")
  }
  return context;
};

export default useCalendar;