"use client"

import React, { useEffect, useState } from "react";
import IconButton from "@/components/global/IconButton";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { borderColor, primaryTextColor } from "@/utils/themeColors";
import CalendarHeader from "./CalendarHeader";
import CalendarDate from "./CalendarBoard/CalendarDate";
import CalendarBoard from "./CalendarBoard";
import useCalendarScheduleForm from "@/store/Calendar/useCalendarScheduleForm";
import useCalendar from "@/store/Calendar/useCalendar";
import { CalendarScheduleType } from "@/utils/calendarTypes";
import CalendarWorkoutDetailsModal from "./CalendarWorkoutDetailsModal";
import CreateScheduleModal from "./CreateScheduleModal";
import CalendarScheduleDetailsModal from "./CalendarScheduleDetailsModal";
import EditScheduleModal from "./EditScheduleModal";
import Modal from "@/components/global/Modal";

export default function Calendar() {
  const {
    showCreateScheduleModal
  }: any = useCalendarScheduleForm();

  const {
    dates,
    startDate,
    setStartDate,
    calendarSchedules
  }: any = useCalendar();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [weeklyCalendarSchedules, setWeeklyCalendarSchedules] = useState([]);
  
  // workout details
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
  const [selectedCalendarSchedule, setSelectedCalendarSchedule] = useState<any>(null);

  // calendar schedule modal details
  const [showCalendarScheduleDetailsModal, setShowCalendarScheduleDetailsModal] = useState<boolean>(false);
  
  // edit schedule modal
  const [showEditScheduleModal, setShowEditScheduleModal] = useState<boolean>(false);

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
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

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

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: object = { day: "numeric", weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const activeDate = (date: string) => {
    if(selectedDate === date) {
      return "bg-black text-white rounded-lg";
    }
    return "";
  };

  const formatMonthTitle = (dateString: string) => {
    const date = new Date(dateString);
    const options: object = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleClickWorkout = (calendarSchedule: any, workoutDetails: any) => {
    setSelectedWorkoutId(workoutDetails._id);
    setSelectedCalendarSchedule(calendarSchedule);
    setShowWorkoutDetailsModal(true);
  };

  const handleClickSession = (calendarSchedule: any) => {
    setSelectedCalendarSchedule(calendarSchedule);
    setShowCalendarScheduleDetailsModal(true);
  };

  return (
    <div className="calendar-page overflow-hidden w-full">
      <CalendarHeader
        month={
          <h3 className={`${primaryTextColor} text-[20px]`}>
            {formatMonthTitle(startDate)}
          </h3>
        }
        createButton={<CalendarHeader.CreateScheduleButton />}
        weeksNavigation={
          <>
            <IconButton onClick={handlePreviousWeek}>
              <SlArrowLeft className={primaryTextColor} />
            </IconButton>
            <IconButton onClick={handleNextWeek}>
              <SlArrowRight className={primaryTextColor} />
            </IconButton>
          </>
        }
      />

      <CalendarBoard
        timesList={<CalendarBoard.TimesList />}
        calendarDate={
          <>
            {dates.map((date: string, index: number) => (
              <CalendarDate
                key={index}
                handleClick={() => handleDateClick(date)}
                activeDate={activeDate(date)}
                date={date}
              />
            ))}
          </>
        }
      >
        {weeklyCalendarSchedules?.map((week: any, key) => (
          <div
            key={key}
            className={`${borderColor} grid-cell border-r flex-1 relative overflow-hidden`}
          >
            {week?.calendarSchedules?.map((calendarSchedule: CalendarScheduleType, index: number) => (
              <CalendarBoard.Schedule
                key={index}
                calendarSchedule={calendarSchedule}
                handleClick={() => {
                  if(calendarSchedule.type === "Workout" || calendarSchedule.type === "Program") {
                    handleClickWorkout(
                      calendarSchedule,
                      calendarSchedule.workoutDetails
                    );
                    return;
                  }
                  handleClickSession(calendarSchedule)
                }}
              />
            ))}
          </div>
        ))}
      </CalendarBoard>

      {showWorkoutDetailsModal && (
        <CalendarWorkoutDetailsModal
          workoutId={selectedWorkoutId}
          onClose={() => setShowWorkoutDetailsModal(false)}
          calendarSchedule={selectedCalendarSchedule}
        />
      )}


      {showCreateScheduleModal && (
        <CreateScheduleModal />
      )}

      {showCalendarScheduleDetailsModal && (
        <CalendarScheduleDetailsModal 
          onClose={() => setShowCalendarScheduleDetailsModal(false)}
          calendarSchedule={selectedCalendarSchedule}
          handleEdit={() => {
            setShowEditScheduleModal(true);
          }}
        />
      )}

      {showEditScheduleModal && (
        <EditScheduleModal
          onClose={() => setShowEditScheduleModal(false)}
          onEditSuccess={(data: any) => {
            setSelectedCalendarSchedule(data);
            setShowEditScheduleModal(false);
          }}
          calendarSchedule={selectedCalendarSchedule}
        />
      )}
    </div>
  );
};