import useCalendar from "@/store/Calendar/useCalendar";
import { IUseCalendarContext } from "@/types/calendar";
import { borderColor, tertiaryTextColor } from "@/utils/themeColors";

export const TimesList = () => {
  const {
    timesList
  }: IUseCalendarContext = useCalendar();

  return (
    <>
      {timesList.map((time: any) => (
        <li 
          key={time} 
          className={`${tertiaryTextColor} h-[100px] relative text-[14px]`}
        >
          {time}
        </li>
      ))}
    </>
  );
};

export default function CalendarTimesList() {
  return (
    <div className={`${borderColor} times border-r w-[140px] pl-10 mt-8`}>
      <ul>
        <li className={`${tertiaryTextColor} h-[50px] text-[14px]`}>
          GMT + 08
        </li>
        <TimesList />
      </ul>
    </div>
  );
};