import useCalendarItemBuilder from "@/contexts/Calendar/useCalendarItemBuilder";

interface CalendarItemProps {
  calendarItem: any;
};

export default function CalendarItem({
  calendarItem
}: CalendarItemProps) {
  const { topOffset, height, startTime, endTime } = useCalendarItemBuilder(
    calendarItem
  );

  return (
    <div
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
};