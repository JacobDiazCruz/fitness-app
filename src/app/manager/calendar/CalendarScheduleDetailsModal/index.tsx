import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import Modal, { ModalContent, ModalFooter } from "@/components/global/Modal";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

interface Props {
  onClose: () => void;
  calendarSchedule: any;
};

export default function CalendarScheduleDetailsModal({
  onClose,
  calendarSchedule
}: Props) {
  const {
    _id,
    taggedDate,
    title,
    type,
    meetingLink,
    owner,
    guests,
    startTime,
    endTime
  } = calendarSchedule;

  const [goingOptions, setGoingOptions] = useState([
    "Yes", "No", "Maybe"
  ]);

  return (
    <Modal onClose={onClose} className="w-[500px] h-fit">
      <ModalContent>
        <div className="flex justify-between">
          <div className="ml-auto flex">
            <IconButton className={`${secondaryTextColor}`}>
              <FiEdit2 />
            </IconButton>
            <IconButton className={`${secondaryTextColor}`}>
              <FiTrash2 />
            </IconButton>
          </div>
        </div>
        
        <div className={`${primaryTextColor} text-[20px] mt-3 font-semibold`}>
          {title}
        </div>
        <div className={`flex gap-[15px] ${secondaryTextColor} text-[14px] mt-2`}>
          <div>
            {formatDate(taggedDate)}
          </div>
          <div>
            {formatTime(startTime.hour)} - {formatTime(endTime.hour)}
          </div>
        </div>
        <div className={`${secondaryTextColor} text-[14px] mt-6`}>
          <div className="flex items-center gap-[15px]">
            <BsCameraVideo className={`${secondaryTextColor} w-5 h-5`} />
            <a href="/" target="_blank">
              <Button variant="contained">
                Join session call
              </Button>
            </a>
          </div>
          <div className="ml-9 mt-1">{meetingLink}</div>
        </div>

        <div className="mt-7 flex gap-[15px]">
          <GoPeople className={`${secondaryTextColor} w-5 h-5`} />
          <div className={`${secondaryTextColor}`}>2 guests</div>
        </div>

        <div className={`${borderColor} flex justify-between items-center border-t mt-10 pt-5`}>
          <div className={`${tertiaryTextColor}`}>Going?</div>
          <div className="flex gap-[10px]">
            {goingOptions.map((option: string) => (
              <Button variant="outlined">
                {option}
              </Button>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};