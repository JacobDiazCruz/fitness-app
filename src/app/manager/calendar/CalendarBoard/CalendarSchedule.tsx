import useCalendarScheduleDisplay from "@/contexts/Calendar/useCalendarScheduleDisplay";

interface CalendarItemProps {
  calendarSchedule: any;
  handleClick: () => any;
};

export default function CalendarSchedule({
  calendarSchedule,
  handleClick
}: CalendarItemProps) {

  const { topOffset, height, startTime, endTime } = useCalendarScheduleDisplay(
    calendarSchedule
  );

  const calendarScheduleColors: any = {
    "Event": "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-50",
    "Workout": "bg-emerald-200 dark:bg-emerald-600 text-emerald-800 dark:text-emerald-50",
    "Program": "bg-[#ecb669] dark:bg-amber-600 text-[#6b4412] dark:text-orange-50"
  };

  return (
    <div
      className={`${calendarScheduleColors[calendarSchedule.type]} cursor-pointer rounded-lg p-2 w-full absolute overflow-hidden`}
      style={{ marginTop: topOffset, height }}
      onClick={handleClick}
    >
      <div className="font-semibold text-[14px]">
        {calendarSchedule.type == "Event" ? (
          <span>{calendarSchedule.title}</span>
        ) : (
          <span>{calendarSchedule.workoutDetails.name}</span>
        )}
      </div>
      <div className="font-light mt-1 text-[12px]">
        {startTime} - {endTime}
      </div>
    </div>
  );
};