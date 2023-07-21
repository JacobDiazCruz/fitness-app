import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import useClients from "@/hooks/clients/useClients";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";
import DateAndTimeFields from "./DateAndTimeFields";

export default function EventSchedule() {
  const { 
    submitForm,
    formDate,
    formStartTime,
    formEndTime
  }: any = useCalendarScheduleBuilder();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedGuests, setSelectedGuests] = useState([]);
  const { clientsList } = useClients();

  return (
    <>
      <ModalContent>
        <div>
          <TextField
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Add title"
          />
        </div>
        <DateAndTimeFields />
        <div className="mt-7">
          <TextArea 
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Add description"
          />
        </div>
        <div className="mt-7">
          {/* <AutoComplete
            placeholder="Select guests"
            value={selectedGuests}
            items={clientsList}
            onChange={(val) => {
              setSelectedGuests(val)
            }}
            removeSelectedItem={(val) => setSelectedGuests(null)}
          /> */}
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            onClick={() => submitForm({
              title,
              description,
              taggedDate: formDate,
              startTime: formStartTime,
              endTime: formEndTime,
              guests: selectedGuests
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