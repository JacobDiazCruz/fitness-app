'use client'

import Button from '@/components/global/Button';
import IconButton from '@/components/global/IconButton';
import PaddedWrapper from '@/components/global/PaddedWrapper';
import React, { useEffect, useState } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { IoIosAdd } from 'react-icons/io';
import CreateCalendarItemModal from './CreateCalendarItemModal';
import { useQuery } from 'react-query';
import { listWeeklyCalendarItems } from '@/api/Calendar';
import { borderColor, primaryTextColor } from '@/utils/themeColors';

// theres a separate collection of calendar_activities with this sample data
// when displaying this to calendar:
// 1. fetch the list with filters by (ownerUserId or guest.userId) by (week from 2023-13-12 2023-20-12)
// 2. FE will map the list and put the items in their respective date/day columns
//  {
//     _id: "123123",
//     taggedDate: "2023-13-02",
//     owner: {
      //     userId: "25412412",
      //     thumbnailImage: "",
      //     firstName: "",
      //     lastName: "",
      //     email: ""
      //   }
//     startTime: {name: "2:00am", hour: "02:00", meridiem: "AM"},
//     endTime: {name: "2:00am", hour: "02:00", meridiem: "AM"},
//     activity: {
//        type: "event | task"
//        title: "",
//        (?)programWorkoutId: "12312412"
//     },
//     guests: [
    //   {
    //     userId: "25412412",
    //     thumbnailImage: "",
    //     firstName: "",
    //     lastName: "",
    //     email: ""
    //   }
    // ]
//  }
function WeekDates() {
  const [startDate, setStartDate] = useState(new Date()); // State to store the start date of the week
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to store the selected date
  // const [startTime, setStartTime] = useState("8:20 AM");
  // const [endTime, setEndTime] = useState("12:99 PM");
  const [showCreateCalendarItemModal, setShowCreateCalendarItemModal] = useState<boolean>(false);
  const [weeklyCalendarItems, setWeeklyCalendarItems] = useState([]);
  const [dates, setDates] = useState([]);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(startDate);
    previousWeek.setDate(previousWeek.getDate() - 7); // Subtract 7 days to go to the previous week
    setStartDate(previousWeek);
  };

  const {
    isError: isErrorCalendarItems,
    isLoading: isLoadingCalendarItems,
    data: calendarItems,
    refetch: refetchCalendarItems
  } = useQuery('calendarItems', () => listWeeklyCalendarItems(JSON.stringify(dates)), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    const weeks = dates.map((date: any) => {
      return {
        date,
        calendarItems: calendarItems?.filter((item: any) => {
          const itemDate = item.taggedDate.substring(0, 10);
          return itemDate === date;
        })
      };
    });
    setWeeklyCalendarItems(weeks);
  }, [calendarItems, dates]);

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
      <li key={time} className={`${primaryTextColor} h-[100px] relative text-[14px]`}>
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

  useEffect(() => {
    const newDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      newDates.push(date.toLocaleDateString());
    }
    setDates(newDates);
  }, [startDate]);

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
          <div className="flex gap-[30px] items-center">
            <h3 className={`${primaryTextColor} text-[20px]`}>
              {formatMonthTitle(startDate)}
            </h3>
            <Button
              startIcon={<IoIosAdd className="text-white w-6 h-6" />}
              onClick={() => setShowCreateCalendarItemModal(true)}
            >
              Create Event
            </Button>
          </div>
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
      
      {showCreateCalendarItemModal && (
        <CreateCalendarItemModal 
          onClose={() => setShowCreateCalendarItemModal(false)}
          refetchCalendarItems={refetchCalendarItems}
        />
      )}
      
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
                  <p className={`${primaryTextColor} text-center text-[16px]`}>
                    {formatDate(date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectedDate && (
          <div className="calendar-schedule-board flex relative h-full mt-5">
            <div className={`${borderColor} times border-r pr-5 pl-10`}>
              <ul>{generateTimeList()}</ul>
            </div>
            <div className="rows absolute pl-[131px] w-full">
              {Array.from({ length: 24 }).map((_, key) => (
                <div key={key} className="h-[100px]">
                  <div 
                    key={key}
                    className={`${borderColor} border-b grid-cell w-full`}
                  />
                </div>
              ))}
            </div>
            {weeklyCalendarItems?.map((week, key) => (
              <div key={key} className={`${borderColor} grid-cell border-r flex-1 z-[50] relative w-[200px] overflow-hidden`}>
                {week?.calendarItems?.map((calendarItem, index: number) => {
                  const startHour = parseInt(calendarItem.startTime.hour.split(':')[0], 10);
                  const endHour = parseInt(calendarItem.endTime.hour.split(':')[0], 10);
                  
                  const initialStartTime = new Date().setHours(startHour, 0);
                  const initialEndTime = new Date().setHours(endHour, 0);
                  
                  const startTime = new Date(initialStartTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                  const endTime = new Date(initialEndTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                  
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
                    height = (endTimeIndex - startTimeIndex + 1) * 100 - (convertedStartTime === startTime ? 100 : 130)
                    if(endTime !== convertedEndTime) {
                      height += 50
                    }
                  }
    
                  let topOffset = startTimeIndex >= 0 ? startTimeIndex * 100 : 0;

                  // if clock's last 2 digits is not equal to 00
                  if (startTime.slice(startTime.indexOf(":") + 1, startTime.indexOf(":") + 3) !== "00") {
                    topOffset += 50; // Add an additional 50px to the topOffset
                  }

                  return (
                    <div
                      key={index}
                      className="text cursor-pointer bg-indigo-200 dark:bg-indigo-950 rounded-lg p-2 text-indigo-800 dark:text-indigo-200 border border-gray-500 dark:border-indigo-900 w-full absolute overflow-hidden"
                      style={{ marginTop: topOffset, height }}
                    >
                      <div className="font-semibold text-[14px]">
                        {calendarItem.title}
                      </div>
                      <div className="font-light mt-1 text-[12px]">
                        {startTime} - {endTime}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );  
}

export default WeekDates;