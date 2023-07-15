import useCalendarScheduleDisplay from "@/contexts/Calendar/useCalendarScheduleDisplay";

interface CalendarItemProps {
  calendarSchedule: any;
};

export default function CalendarSchedule({
  calendarSchedule
}: CalendarItemProps) {
  const { topOffset, height, startTime, endTime } = useCalendarScheduleDisplay(
    calendarSchedule
  );
  
  switch(calendarSchedule.type) {
    case "Event":
      return (
        <div
          className="text cursor-pointer bg-indigo-200 dark:bg-indigo-950 rounded-lg p-2 text-indigo-800 dark:text-indigo-200 border border-gray-500 dark:border-indigo-900 w-full absolute overflow-hidden"
          style={{ marginTop: topOffset, height }}
        >
          <div className="font-semibold text-[14px]">
            {calendarSchedule.title}
          </div>
          <div className="font-light mt-1 text-[12px]">
            {startTime} - {endTime}
          </div>
        </div>
      );
    case "Workout":
      return (
        <div
          className="text cursor-pointer bg-indigo-200 dark:bg-indigo-950 rounded-lg p-2 text-indigo-800 dark:text-indigo-200 border border-gray-500 dark:border-indigo-900 w-full absolute overflow-hidden"
          style={{ marginTop: topOffset, height }}
        >
          <div className="font-semibold text-[14px]">
            {calendarSchedule.workoutDetails.name}
          </div>
          <div className="font-light mt-1 text-[12px]">
            {startTime} - {endTime}
          </div>
        </div>
      );
    default:
      return <></>
  }
};