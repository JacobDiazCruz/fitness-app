import useCalendar from "@/contexts/Calendar/useCalendar";
import { borderColor, tertiaryTextColor } from "@/utils/themeColors";

export default function CalendarTimesList() {
  const {
    generateTimeList
  }: any = useCalendar();

  return (
    <div className={`${borderColor} times border-r w-[140px] pl-10 mt-8`}>
      <ul>
        <li className={`${tertiaryTextColor} h-[50px] text-[14px]`}>
          GMT + 08
        </li>
        {generateTimeList()}
      </ul>
    </div>
  );
};