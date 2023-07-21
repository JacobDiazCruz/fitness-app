import AutoComplete from "@/components/global/AutoComplete";
import DatePickerField from "@/components/global/DatePickerField";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";

export default function DateAndTimeFields() {
  const { 
    formDate,
    formStartTime,
    formEndTime,
    setFormDate,
    setFormStartTime,
    setFormEndTime
  }: any = useCalendarScheduleBuilder();

  return (
    <div className="flex gap-[15px] mt-7">
      <div>
        <DatePickerField
          value={formDate}
          onChange={(value: any) => setFormDate(value)}
        />
      </div>
      <div className="flex gap-[10px] items-center">
        <div className="w-[100px]">
          <AutoComplete 
            items={timesList}
            value={formStartTime}
            onChange={(value: any) => setFormStartTime(value)}
          />
        </div>
        <div className={primaryTextColor}>-</div>
        <div className="w-[100px]">
          <AutoComplete
            items={timesList}
            value={formEndTime}
            onChange={(value: any) => setFormEndTime(value)}
          />
        </div>
      </div>
    </div>
  );
}