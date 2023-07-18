import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import { primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const CalendarContext = createContext(null);

export const CalendarProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    if (startDate) {
      const newDates: string[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        newDates.push(date.toLocaleDateString());
      }
      setDates(newDates);
    }
  }, [startDate]);
  
  const { 
    data: calendarSchedules, 
    refetch: refetchCalendarSchedules 
  } = useQuery(
    'calendarSchedules',
    () => {
      return listWeeklyCalendarSchedules(JSON.stringify(dates));
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: false // Disable the query initially
    }
  );
  
  useEffect(() => {
    if (dates.length > 0) {
      refetchCalendarSchedules();
    }
  }, [dates, refetchCalendarSchedules]);

  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(0);
      times.push(time);
    }
    const options: object = { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };

    return times.map((time) => (
      <li key={time} className={`${tertiaryTextColor} h-[100px] relative text-[14px]`}>
        {time.toLocaleTimeString('en-US', options)}
      </li>
    ));
  };

  const value = {
    dates,
    setDates,
    startDate,
    setStartDate,    
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
    throw new Error("useCalendar must be used within the CalendarProvider context")
  }
  return context;
};

export default useCalendar;
