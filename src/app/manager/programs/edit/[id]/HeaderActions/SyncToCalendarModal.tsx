import { createCalendarSchedule } from "@/api/Calendar";
import { getProgram } from "@/api/Program";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useAlert from "@/store/Alert";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

interface Props {
  onClose: any;
};

export default function SyncToCalendarModal({
  onClose
}: Props) {
  const { dispatchAlert }: any = useAlert();
  const params = useParams();

  const [startingDate, setStartingDate] = useState(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const createCalendarScheduleMutation = useMutation(createCalendarSchedule);

  // Get program data
  const {
    isLoading: isLoadingProgram,
    data: programData
  } = useQuery('program', () => getProgram(params.id), {
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  const submitSyncToCalendar = () => {
    const workouts = programData?.weeks.flatMap((week: any) =>
      week.days.flatMap((day: any) => day.workouts.map((workout: any) => {
        return {
          dayCount: day.dayCount,
          workoutId: workout._id
        }
      }))
    );

    submitForm({
      programDetails: {
        _id: programData?._id,
        name: programData?.name,
        workouts
      },
      taggedDate: startingDate,
      startTime,
      endTime
    });
  };

  /**
   * @purpose To add/create a new calendar item
   * @action createCalendarScheduleMutation
   */
   const submitForm = async (data: any) => {
    try {
      const date = new Date(data.taggedDate);
      const formattedDate = date.toLocaleDateString("en-US");

      const res = await createCalendarScheduleMutation.mutateAsync({
        data: {
          ...data,
          taggedDate: formattedDate
        },
        type: "Program"
      });
      
      if(!res.success) throw Error(res.message);

      dispatchAlert({
        type: "SUCCESS",
        message: res.message
      });
      onClose();

    } catch(err) {
      console.log(err);
      dispatchAlert({
        type: "ERROR",
        message: "There's something wrong in creating a calendar item. Please try again."
      });
    }
  };

  return (
    <Modal onClose={onClose} className="w-[520px] h-[320px]">
      <ModalHeader>
        <ModalTitle>
          Sync to Calendar
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <p className={`${secondaryTextColor} text-[13px] mb-4`}>
          You can change the date and time for each workout <br/> later on your calendar.
        </p>
        <div className="field flex gap-[15px]">
          <DatePickerField
            value={startingDate}
            onChange={(val: any) => setStartingDate(val)}
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
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            className="ml-auto"
            onClick={() => submitSyncToCalendar()}
            disabled={isLoadingProgram}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};