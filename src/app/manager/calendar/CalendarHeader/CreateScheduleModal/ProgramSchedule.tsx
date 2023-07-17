import { listPrograms } from "@/api/Program";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { DayTime } from "@/utils/calendarTypes";
import { Program } from "@/utils/programTypes";
import { fieldBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";
import { useQuery } from "react-query";

export default function ProgramSchedule() {
  const { submitForm }: any = useCalendarScheduleBuilder();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectAllWeeks, setSelectAllWeeks] = useState<boolean>(true);

  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<DayTime | null>(null);
  const [endTime, setEndTime] = useState<DayTime | null>(null);

  const {
    isLoading,
    isError,
    data: programs,
    error
  } = useQuery('programs', () => {
    const userRole = localStorage?.getItem("userRole");
    return listPrograms(userRole == "Client" ? "Client" : "");
  });

  const submitProgram = () => {
    const workouts = selectedProgram?.weeks.flatMap((week: any) =>
      week.days.flatMap((day: any) => day.workouts.map((workout: any) => {
        return {
          dayCount: day.dayCount,
          workoutId: workout
        }
      }))
    );

    submitForm({
      programDetails: {
        _id: selectedProgram?._id,
        name: selectedProgram?.name,
        workouts
      },
      taggedDate: date,
      startTime,
      endTime
    });
  };

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
            <div className="flex gap-[10px] items-center">
              <div className="w-[100px]">
                <AutoComplete 
                  items={timesList}
                  value={startTime}
                  placeholder="Start time"
                  onChange={(value: any) => setStartTime(value)}
                />
              </div>
              <div className={primaryTextColor}>-</div>
              <div className="w-[100px]">
                <AutoComplete 
                  items={timesList}
                  value={endTime}
                  placeholder="End time"
                  onChange={(value: any) => setEndTime(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            onClick={() => submitProgram()} 
            className="ml-auto"
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};