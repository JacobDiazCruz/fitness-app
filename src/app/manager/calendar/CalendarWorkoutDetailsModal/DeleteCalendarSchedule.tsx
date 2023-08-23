import { deleteCalendarSchedule } from "@/api/Calendar";
import IconButton from "@/components/global/IconButton";
import useCalendar from "@/store/Calendar/useCalendar";
import { IUseCalendarContext } from "@/types/calendar";
import { secondaryTextColor } from "@/utils/themeColors";
import { FiTrash2 } from "react-icons/fi";
import { useMutation } from "react-query";

interface Props {
  calendarScheduleId: string;
  onClose: any;
};

export default function DeleteCalendarSchedule({
  calendarScheduleId,
  onClose
}: Props) {

  const {
    refetchCalendarSchedules
  }: IUseCalendarContext = useCalendar();

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
      className={`${secondaryTextColor}`}
      onClick={() => {
        deleteCalendarScheduleMutation.mutateAsync(calendarScheduleId);
      }}
    >
      <FiTrash2 />
    </IconButton>
  );
};