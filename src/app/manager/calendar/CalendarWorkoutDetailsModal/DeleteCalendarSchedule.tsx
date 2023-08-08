import { deleteCalendarSchedule } from "@/api/Calendar";
import IconButton from "@/components/global/IconButton";
import useCalendar from "@/store/Calendar/useCalendar";
import { BsTrash } from "react-icons/bs";
import { useMutation } from "react-query";

interface Props {
  calendarScheduleId: string;
  onClose: any;
};

export default function DeleteCalendarSchedule({
  calendarScheduleId,
  onClose,
}: Props) {

  const {
    refetchCalendarSchedules
  }: any = useCalendar();

  const deleteCalendarScheduleMutation = useMutation(deleteCalendarSchedule, {
    onSuccess: async () => {
      refetchCalendarSchedules();
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <IconButton
      onClick={() => {
        deleteCalendarScheduleMutation.mutateAsync(calendarScheduleId);
      }}
    >
      <BsTrash className="w-4 h-55 fill-neutral-600 dark:fill-white" />
    </IconButton>
  );
};