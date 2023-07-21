import { listWorkouts } from "@/api/Workout";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import { DayTime } from "@/utils/calendarTypes";
import { fieldBgColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { Workout } from "@/utils/workoutTypes";
import { useState } from "react";
import { LuDumbbell } from "react-icons/lu";
import { useQuery } from "react-query";
import DateAndTimeFields from "./DateAndTimeFields";

export default function WorkoutSchedule() {
  const { 
    submitForm,
    formDate,
    formStartTime,
    formEndTime
  }: any = useCalendarScheduleBuilder();

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const {
    data: workouts
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const disableSubmit = () => {
    let disabled = false;
    if(!selectedWorkout || !formStartTime || !formEndTime) {
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
          
          <DateAndTimeFields />
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            disabled={disableSubmit()}
            onClick={() => submitForm({
              workoutId: selectedWorkout?._id,
              taggedDate: formDate,
              startTime: formStartTime,
              endTime: formEndTime,
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