import { listPrograms } from "@/api/Program";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { DayTime } from "@/utils/calendarTypes";
import { Program } from "@/utils/programTypes";
import { fieldBgColor, secondaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";
import { useQuery } from "react-query";

export default function ProgramSchedule() {
  const { submitForm } = useCalendarScheduleBuilder();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectAllWeeks, setSelectAllWeeks] = useState<boolean>(true);

  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<DayTime | null>(null);

  const {
    isLoading, 
    isError,
    data: programs,
    error
  } = useQuery('programs', () => {
    const userRole = localStorage?.getItem("userRole");
    return listPrograms(userRole == "Client" ? "Client" : "");
  });

  return (
    <>
      <ModalContent>
        <div className="program-schedule">
          <div className="flex gap-[15px] items-center w-full">
            <div className="flex-1">
              {programs ? (
                <AutoComplete
                  placeholder="Select a program"
                  items={programs}
                  value={selectedProgram}
                  onChange={(val) => {
                    setSelectedProgram(val)
                  }}
                  removeSelectedItem={(val) => setSelectedProgram(null)}
                />
              ) : (
                <div className={`w-full ${fieldBgColor} h-[45px] rounded-lg`}></div>
              )}
            </div>
            <div className="flex gap-[10px] mt-3 items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                checked={selectAllWeeks}
                onChange={(e) => setSelectAllWeeks(e.target.checked)}
              />
              <div className={`${secondaryTextColor} text-[12px]`}>
                Select all weeks
              </div>
            </div>
          </div>
          
          <div className="flex gap-[10px] mt-7">
            <DatePickerField
              value={date}
              onChange={(value: any) => setDate(value)}
              placeholder="Starting date"
            />
            <AutoComplete 
              items={timesList}
              value={startTime}
              placeholder="Starting time"
              onChange={(value: any) => setStartTime(value)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button onClick={() => submitForm({
            programId: selectedProgram?._id,
            taggedDate: date,
            startTime
          })} className="ml-auto">
            Submit
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};