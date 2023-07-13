import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import FieldName from "@/components/global/FieldName";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import { useState } from "react";

interface Props {
  onClose: any;
};

export default function SyncToCalendarModal({
  onClose
}: Props) {

  const [startingDate, setStartingDate] = useState(null);

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