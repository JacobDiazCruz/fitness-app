import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import FieldName from "@/components/global/FieldName";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";

interface Props {
  onClose: any;
};

export default function SyncToCalendarModal({
  onClose
}: Props) {

  const [startingDate, setStartingDate] = useState(null);
  const [startTime, setStartTime] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[500px] h-fit">
      <ModalHeader>
        <ModalTitle>
          Sync to Calendar
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="field">
          <FieldName>
            Starting on
          </FieldName>
          <DatePickerField
            value={startingDate}
            onChange={(val) => setStartingDate(val)}
          />
        </div>
        <div className="field mt-7">
          <p className={`${primaryTextColor} text-[14px]`}>
            Starting time
          </p>
          <p className={`${secondaryTextColor} text-[12px]`}>
            You can update the time of each workout later on the calendar
          </p>
          <div className="mt-3 w-[150px]">
            <AutoComplete 
              items={timesList}
              value={startTime}
              onChange={(value: any) => setStartTime(value)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            className="ml-auto"
            // onClick={() => }
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}