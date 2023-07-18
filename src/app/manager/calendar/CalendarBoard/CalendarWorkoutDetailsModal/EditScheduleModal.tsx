import { editCalendarSchedule } from "@/api/Calendar";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useCalendar from "@/contexts/Calendar/useCalendar";
import { DayTime } from "@/utils/calendarTypes";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";
import { useMutation } from "react-query";

interface Props {
  calendarScheduleId: string;
  onClose: any;
  taggedDate: string;
  startTime: DayTime;
  endTime: DayTime;
};

export default function EditScheduleModal({
  calendarScheduleId,
  taggedDate,
  startTime,
  endTime,
  onClose
}: Props) {

  const {
    refetchCalendarSchedules
  }: any = useCalendar();

  const [newTaggedDate, setNewTaggedDate] = useState<Date>(new Date(taggedDate));
  const [newStartTime, setNewStartTime] = useState<DayTime>(startTime);
  const [newEndTime, setNewEndTime] = useState<DayTime>(endTime);

  const editCalendarScheduleMutation = useMutation(editCalendarSchedule, {
    onSuccess: async () => {
      refetchCalendarSchedules();
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });
  
  const submitForm = () => {
    editCalendarScheduleMutation.mutateAsync({
      id: calendarScheduleId,
      data: {
        taggedDate: newTaggedDate?.toLocaleDateString(),
        startTime,
        endTime
      }
    });
  };

  return (
    <Modal onClose={onClose} className="w-[520px] h-[250px]">
      <ModalHeader>
        <ModalTitle>
          Edit Schedule
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="flex gap-[10px]">
          <DatePickerField
            value={newTaggedDate}
            onChange={(value: any) => setNewTaggedDate(value)}
            placeholder="Starting date"
          />
          <div className="flex gap-[10px] items-center">
            <div className="w-[100px]">
              <AutoComplete
                items={timesList}
                value={newStartTime}
                placeholder="Start time"
                onChange={(value: any) => setNewStartTime(value)}
              />
            </div>
            <div className={primaryTextColor}>-</div>
            <div className="w-[100px]">
              <AutoComplete 
                items={timesList}
                value={newEndTime}
                placeholder="End time"
                onChange={(value: any) => setNewEndTime(value)}
              />
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button
            className="ml-auto"
            onClick={submitForm}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};