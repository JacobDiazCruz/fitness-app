import useCalendarScheduleForm from "@/store/Calendar/useCalendarScheduleForm";
import { borderColor, primaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import { TimeItem, timesList } from "@/utils/timesList";
import { useEffect, useState } from "react";

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
    showCreateScheduleModal,
    setShowCreateScheduleModal
  }: any = useCalendarScheduleForm();

  const {
    handleUpdateField
  }: any = useCalendarScheduleForm();

  // State to keep track of the index of the currently clicked cell
  const [activeCellIndex, setActiveCellIndex] = useState<number | null>(null);

  const [defaultDateAndTime, setDefaultDateAndTime] = useState<any>({
    startTime: null,
    endTime: null,
    taggedDate: null
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: object = { day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    if(!showCreateScheduleModal) {
      setActiveCellIndex(null);
    }
  }, [showCreateScheduleModal]);

  const getEndHour = (index: number) => {
    const newValueIndex = timesList[index].name.startsWith("11") ? 0 : index + 2;
    return timesList[newValueIndex];
  };

  /**
   * @purpose To set default date and time to calendar modal
   */
  useEffect(() => {
    if(defaultDateAndTime && showCreateScheduleModal) {
      for (const [key, value] of Object.entries(defaultDateAndTime)) {
        if(value) {
          console.log(key, value);
          handleUpdateField(key, value);
        }
      }
    }
  }, [defaultDateAndTime, showCreateScheduleModal]);

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
              className="relative cursor-pointer w-full"
              onClick={() => {
                setDefaultDateAndTime({
                  startTime: time,
                  endTime: getEndHour(index),
                  taggedDate: new Date(date)
                });
                setShowCreateScheduleModal(true);
                setActiveCellIndex(index); // Update the active cell index
              }}
            >
              <div
                className={`
                  ${activeCellIndex === index ? 'bg-blue-600' : primaryBgColor}
                  border-l
                  time-cell
                  relative
                  w-full
                  ${time.hour.endsWith("00") && 'border-t'}
                  ${borderColor}
                  h-[50px] text-white
                  p-2
                  text-[13px]
                `}
              >
                {activeCellIndex === index && (
                  <span>
                    {time.name} - {getEndHour(index).name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};