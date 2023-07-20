import useCalendar from "@/contexts/Calendar/useCalendar";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { shadowColor, tertiaryTextColor } from "@/utils/themeColors";
import { TimeItem, timesList } from "@/utils/timesList";

interface CalendarDateProps { 
  handleClick: () => void;
  activeDate: string;
  date: string;
};

export default function CalendarDate({
  handleClick,
  activeDate,
  date
}: CalendarDateProps) {

  const {
    setCurrentSelectedStartTime,
    setCurrentSelectedEndTime,
    setCurrentSelectedDate,
    setShowCreateScheduleModal
  }: any = useCalendarScheduleBuilder();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: object = { day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <li
      onClick={handleClick}
      className="flex-1"
    >
      <div className="w-full">
        <div
          className={`${activeDate} w-fit m-auto px-2 py-1 cursor-pointer`}
        >
          <p className={`${tertiaryTextColor} text-left text-[16px]`}>
            {formatDate(date)}
          </p>
        </div>

        <div className="rows z-[80] mt-[63px] absolute w-full">
          {timesList.map((time: TimeItem, index: number) => (
            <div 
              key={index}
              className="relative cursor-pointer"
              onClick={() => {
                setCurrentSelectedStartTime(time);
                setCurrentSelectedEndTime(timesList[index + 2]);
                setCurrentSelectedDate(new Date(date));
                setShowCreateScheduleModal(true);
              }}
            >
              <div className={`h-[50px] text-white opacity-[0]`}>
                {time.name}
              </div>
              <div
                className={`${shadowColor} shadow-[inset_0_-1px_1px] absolute top-0 left-0 h-full w-full`}
              />
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};