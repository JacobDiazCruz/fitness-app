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
  const [dayTimes, setDayTimes] = useState<any>([]);

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

  useEffect(() => {
    const times = [];
    const options = {
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true
    };

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);

        // Format the time using Intl.DateTimeFormat
        const formattedTime = time.toLocaleTimeString('en-US', options);
        times.push(formattedTime);
      }
    }

    setDayTimes(times);
  }, []);

  const generateTimeList = () => {
    const times = [];
    const options = {
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true
    };

    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(0);

      // Format the time using Intl.DateTimeFormat
      const formattedTime = time.toLocaleTimeString('en-US', options);

      times.push(formattedTime);
    }

    return times.map((time: any) => (
      <li key={time} className={`${tertiaryTextColor} h-[100px] relative text-[14px]`}>
        {time}
      </li>
    ));
  };

  const value = {
    dates,
    dayTimes,
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
