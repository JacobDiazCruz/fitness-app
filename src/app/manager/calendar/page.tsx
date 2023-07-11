'use client'

import IconButton from '@/components/global/IconButton';
import PaddedWrapper from '@/components/global/PaddedWrapper';
import { primaryTextColor } from '@/utils/themeColors';
import React, { useState } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

// theres a separate collection of days with this sample data
//  {
//     _id: "123123",
//     taggedDate: "2023-13-02",
//     schedules: [
//       {
//         startTime: "7:00pm",
//         endTime: "8:00pm",
//         task: {
//           title: "workout",
//           programId: "12312412"
//         }
//       }
//     ]
//  }
function WeekDates() {
  const [startDate, setStartDate] = useState(new Date()); // State to store the start date of the week
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const [startTime, setStartTime] = useState("8:20 AM");
  const [endTime, setEndTime] = useState("12:99 PM");

  const handlePreviousWeek = () => {
    const previousWeek = new Date(startDate);
    previousWeek.setDate(previousWeek.getDate() - 7); // Subtract 7 days to go to the previous week
    setStartDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(nextWeek.getDate() + 7); // Add 7 days to go to the next week
    setStartDate(nextWeek);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

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
      <li key={time} className="h-[100px]">
        {time.toLocaleTimeString('en-US', options)}
      </li>
    ));
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatMonthTitle = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  const activeDate = (date) => {
    if(selectedDate === date) {
      return "bg-black text-white rounded-lg";
    }
    return "";
  };

  return (
    <div className="calendar-page overflow-hidden w-full">
      <PaddedWrapper>
        <div className="calendar-header flex justify-between w-full">
          <h3>{formatMonthTitle(startDate)}</h3>
          <div>
            <IconButton onClick={handlePreviousWeek}>
              <SlArrowLeft />
            </IconButton>
            <IconButton onClick={handleNextWeek}>
              <SlArrowRight />
            </IconButton>
          </div>
        </div>
      </PaddedWrapper>
      
      <div className="overflow-hidden">
        <div className="pr-9 pl-[100px]">
          <ul className="flex w-full"> {/* Add w-full to make the ul flex container take up the full width */}
            {dates.map((date) => (
              <li 
                key={date}
                onClick={() => handleDateClick(date)}
                className="flex-1"
              >
                <div 
                  onClick={() => handleDateClick(date)}
                  className={`${activeDate(date)} w-fit m-auto px-2 py-1 cursor-pointer`}
                >
                  <p className={`text-center text-[16px]`}>
                    {formatDate(date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectedDate && (
          <div className="calendar-schedule-board flex relative h-full mt-5">
            <div className="times border-r pr-5 pl-10">
              <ul>{generateTimeList()}</ul>
            </div>
            {/* <div className="rows absolute pl-[131px] w-full">
              {Array.from({ length: 24 }).map((_, key) => (
                <div key={key} className="grid-cell border-b mb-[100px] w-full" />
              ))}
            </div> */}
            {Array.from({ length: 7 }).map((_, key) => {
              const timeList = generateTimeList();

              // Check if the minutes of startTime is not equal to "00"
              let convertedStartTime = startTime;
              if (startTime.slice(-5, -3) !== "00") {
                convertedStartTime = startTime.slice(0, startTime.lastIndexOf(":") + 1) + "00" + startTime.slice(-3);
              }

              const startTimeIndex = timeList.findIndex((timeElement) => {
                const timeText = timeElement.props.children;
                return timeText === convertedStartTime;
              });

              let convertedEndTime = endTime;
              if (startTime.slice(-5, -3) !== "00") {
                convertedEndTime = endTime.slice(0, endTime.lastIndexOf(":") + 1) + "00" + endTime.slice(-3);
              }

              const endTimeIndex = timeList.findIndex((timeElement) => {
                const timeText = timeElement.props.children;
                return timeText === convertedEndTime;
              });

              let height = 0;
              if(endTimeIndex > 0) {
                height = (endTimeIndex - startTimeIndex + 1) * 100 - (convertedStartTime === startTime ? 80 : 130)
                if(endTime !== convertedEndTime) {
                  height += 50
                }
              }

              let topOffset = startTimeIndex >= 0 ? startTimeIndex * 100 : 0;
              if (startTime.slice(startTime.indexOf(":") + 1, startTime.indexOf(":") + 3) !== "00") {
                topOffset += 50; // Add an additional 50px to the topOffset
              }

              return (
                <div key={key} className="grid-cell border-r flex-1 px-1">
                  <div 
                    className="text bg-indigo-200 rounded-lg p-2 text-indigo-800"
                    style={{ marginTop: topOffset, height }}
                  >
                    <div className="font-semibold text-[14px]">
                      New Title
                    </div>
                    <div className="font-light mt-1 text-[12px]">
                      {startTime} - {endTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );  
}

export default WeekDates;