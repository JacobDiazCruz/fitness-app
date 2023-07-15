'use client'

import IconButton from '@/components/global/IconButton';
import React, { useEffect, useState } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import CreateScheduleModal from './CalendarHeader/CreateScheduleModal';
import { borderColor, primaryTextColor } from '@/utils/themeColors';
import CreateScheduleButton from './CalendarHeader/CreateScheduleButton';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarSchedule from './CalendarScheduleBoard/CalendarSchedule';
import CalendarDate from './CalendarScheduleBoard/CalendarDate';
import CalendarScheduleBoard from './CalendarScheduleBoard/CalendarScheduleBoard';
import CalendarTimesList from './CalendarScheduleBoard/CalendarTimesList';
import useCalendarScheduleBuilder from '@/contexts/Calendar/useCalendarScheduleBuilder';
import useCalendar from '@/contexts/Calendar/useCalendar';

export default function Calendar() {
  const {
    showCreateScheduleModal
  } = useCalendarScheduleBuilder();

  const {
    dates,
    startDate,
    setStartDate,
    calendarSchedules
  } = useCalendar();

  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to store the selected date
  const [weeklyCalendarSchedules, setWeeklyCalendarSchedules] = useState([]);

  /**
   * @purpose To set weekly calendar items
   * @action setWeeklyCalendarSchedules
   */
  useEffect(() => {
    const weeks = dates.map((date: any) => {
      return {
        date,
        calendarSchedules: calendarSchedules?.filter((item: any) => {
          const itemDate = item.taggedDate.substring(0, 10);
          return itemDate === date;
        })
      };
    });
    setWeeklyCalendarSchedules(weeks);
  }, [calendarSchedules, dates]);

  /**
   * @purpose To set current date as default selected date
   * @action setSelectedDate
   */
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  }, []);

  const handleNextWeek = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(nextWeek.getDate() + 7); // Add 7 days to go to the next week
    setStartDate(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(startDate);
    previousWeek.setDate(previousWeek.getDate() - 7); // Subtract 7 days to go to the previous week
    setStartDate(previousWeek);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const activeDate = (date) => {
    if(selectedDate === date) {
      return "bg-black text-white rounded-lg";
    }
    return "";
  };

  const formatMonthTitle = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="calendar-page overflow-hidden w-full">
      <CalendarHeader
        month={
          <h3 className={`${primaryTextColor} text-[20px]`}>
            {formatMonthTitle(startDate)}
          </h3>
        }
        createButton={
          <CreateScheduleButton />
        }
        prevWeekButton={
          <IconButton onClick={handlePreviousWeek}>
            <SlArrowLeft />
          </IconButton>
        }
        nextWeekButton={
          <IconButton onClick={handleNextWeek}>
            <SlArrowRight />
          </IconButton>
        }
      />

      <div className="overflow-hidden">
        <div className="pr-9 pl-[100px]">
          <ul className="flex w-full">
            {dates.map((date, index: number) => (
              <CalendarDate
                key={index}
                handleClick={() => handleDateClick(date)}
                activeDate={activeDate(date)}
                formattedDate={formatDate(date)}
              />
            ))}
          </ul>
        </div>
        
        <CalendarScheduleBoard>
          <CalendarTimesList />

          {weeklyCalendarSchedules?.map((week, key) => (
            <div
              key={key} 
              className={`${borderColor} grid-cell border-r flex-1 z-[50] relative w-[200px] overflow-hidden`}
            >
              {week?.calendarSchedules?.map((calendarSchedule, index: number) => (
                <CalendarSchedule
                  key={index}
                  calendarSchedule={calendarSchedule}
                />
              ))}
            </div>
          ))}
        </CalendarScheduleBoard>
      </div>

      {/* Modals */}
      {showCreateScheduleModal && (
        <CreateScheduleModal />
      )}
    </div>
  );
};