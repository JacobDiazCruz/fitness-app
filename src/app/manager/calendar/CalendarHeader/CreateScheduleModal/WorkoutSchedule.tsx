import { listWorkouts } from "@/api/Workout";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { DayTime } from "@/utils/calendarTypes";
import { fieldBgColor, primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { Workout } from "@/utils/workoutTypes";
import { useState } from "react";
import { LuDumbbell } from "react-icons/lu";
import { useQuery } from "react-query";

export default function WorkoutSchedule() {
  const { submitForm }: any = useCalendarScheduleBuilder();

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<DayTime | null>(null);
  const [endTime, setEndTime] = useState<DayTime | null>(null);

  const {
    data: workouts
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const disableSubmit = () => {
    let disabled = false;
    if(!selectedWorkout || !startTime || !endTime) {
      disabled = true;
    }
    return disabled;
  };

  return (
    <>
      <ModalContent>
        <div className="workout-schedule">
          <div className="flex gap-[15px] items-center w-full">
            <div className="flex-1">
              {workouts ? (
                <AutoComplete
                  startIcon={<LuDumbbell className={`w-3 h-3 fill-white ${primaryTextColor}`} />}
                  placeholder="Select a workout"
                  items={workouts}
                  value={selectedWorkout}
                  onChange={(val) => {
                    setSelectedWorkout(val)
                  }}
                  removeSelectedItem={(val) => setSelectedWorkout(null)}
                />
              ) : (
                <div className={`w-full ${fieldBgColor} h-[45px] rounded-lg`}></div>
              )}
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
            disabled={disableSubmit()}
            onClick={() => submitForm({
              workoutDetails: {
                _id: selectedWorkout?._id,
                name: selectedWorkout?.name,
                description: selectedWorkout?.description,
                exercisesCount: selectedWorkout?.exercises?.length || 0
              },
              taggedDate: date,
              startTime,
              endTime,
              guests: []
            })}
            className="ml-auto"
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};