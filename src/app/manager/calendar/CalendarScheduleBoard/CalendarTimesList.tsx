import useCalendar from "@/contexts/Calendar/useCalendar";
import { borderColor } from "@/utils/themeColors";

export default function CalendarTimesList() {
  const {
    generateTimeList
  } = useCalendar();

  return (
    <>
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
    </>
  );
}