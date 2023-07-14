import AutoComplete from "@/components/global/AutoComplete";
import DatePickerField from "@/components/global/DatePickerField";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { timesList } from "@/utils/timesList";
import Button from "@/components/global/Button";
import { useMutation } from "react-query";
import { createCalendarItem } from "@/api/Calendar";
import useAlert from "@/contexts/Alert";
import TextArea from "@/components/global/TextArea";
import FieldName from "@/components/global/FieldName";
import { CalendarItem, DayTime } from "@/utils/calendarTypes";
import TextField from "@/components/global/TextField";
import useClients from "@/hooks/clients/useClients";
import { primaryTextColor } from "@/utils/themeColors";

interface Props {
  onClose: () => Dispatch<SetStateAction<boolean>>;
  refetchCalendarItems: any;
};

export default function CreateCalendarItemModal({
  onClose,
  refetchCalendarItems
}: Props) {
  const { dispatchAlert }: any = useAlert();
  const { clientsList } = useClients();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<DayTime | null>(null);
  const [endTime, setEndTime] = useState<DayTime | null>(null);
  const [description, setDescription] = useState<string>("");
  const [selectedGuests, setSelectedGuests] = useState([]);

  const createCalendarItemMutation = useMutation(createCalendarItem);

  /**
   * @purpose To add/create a new calendar item
   * @action createCalendarItemMutation
   */
  const submitForm = async () => {
    try {
      const data: CalendarItem = {
        title,
        taggedDate: new Date(date).toLocaleDateString(),
        startTime,
        endTime,
        type: "event",
        description: "",
        guests: []
      };

      const res = await createCalendarItemMutation.mutateAsync(data);
      
      if(!res.success) throw Error(res.message);

      dispatchAlert({
        type: "SUCCESS",
        message: res.message
      });
      refetchCalendarItems();
      onClose();
    } catch(err) {
      console.log(err)
      dispatchAlert({
        type: "ERROR",
        message: "There's something wrong in creating a calendar item. Please try again."
      });
    }
  };

  return (
    <Modal onClose={onClose} className="w-[550px] h-[600px]">
      <ModalHeader>
        <ModalTitle>
          Create
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div>
          <FieldName>Add title</FieldName>
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
          <Button onClick={submitForm} className="ml-auto">
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}