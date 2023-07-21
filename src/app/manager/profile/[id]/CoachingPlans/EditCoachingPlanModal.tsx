import AutoCompleteMultiple from "@/components/global/AutoCompleteMultiple";
import FieldName from "@/components/global/FieldName";
import Modal, { ModalContent, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import { useState } from "react";

interface Props {
  onClose: any;
};

export default function EditCoachingPlanModal({
  onClose
}: Props) {
  const [selectedServices, setSelectedServices] = useState([]);

  return (
    <Modal onClose={onClose} className="w-[600px] h-[400px]">
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Plan
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="flex w-full gap-[15px]">
          <div className="w-full">
            <FieldName>Name</FieldName>
            <TextField 
              placeholder="Enter title"
            />
          </div>
        </div>
        <div className="w-full mt-7">
          <FieldName>Services</FieldName>
          <AutoCompleteMultiple
            placeholder="Name"
            onChange={(val) => {
              console.log(val);
            }}
            value={selectedServices}
            items={[{name: "John Doe"}]}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};