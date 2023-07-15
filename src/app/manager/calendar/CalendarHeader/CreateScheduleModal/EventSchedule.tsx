import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import DatePickerField from "@/components/global/DatePickerField";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import useClients from "@/hooks/clients/useClients";
import { DayTime } from "@/utils/calendarTypes";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { useState } from "react";

export default function EventSchedule() {
  const { submitForm } = useCalendarScheduleBuilder();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<DayTime | null>(null);
  const [endTime, setEndTime] = useState<DayTime | null>(null);
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
        <div className="flex gap-[15px] mt-7">
          <div>
            <DatePickerField
              value={date}
              onChange={(value: any) => setDate(value)}
            />
          </div>
          <div className="flex gap-[10px] items-center">
            <div className="w-[100px]">
              <AutoComplete 
                items={timesList}
                value={startTime}
                onChange={(value: any) => setStartTime(value)}
              />
            </div>
            <div className={primaryTextColor}>-</div>
            <div className="w-[100px]">
              <AutoComplete 
                items={timesList}
                value={endTime}
                onChange={(value: any) => setEndTime(value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-7">
          <TextArea 
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Add description"
          />
        </div>
        <div className="mt-7">
          <AutoComplete
            placeholder="Select guests"
            value={selectedGuests}
            items={clientsList}
            onChange={(val) => {
              setSelectedGuests(val)
            }}
            removeSelectedItem={(val) => setSelectedGuests(null)}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            onClick={() => submitForm({
              title,
              taggedDate: date,
              description,
              startTime,
              endTime,
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