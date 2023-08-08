import Button from "@/components/global/Button";
import { ModalContent, ModalFooter } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import useCalendarScheduleBuilder from "@/store/Calendar/useCalendarScheduleBuilder";
import { useState } from "react";

export default function TaskSchedule() {
  const { submitForm }: any = useCalendarScheduleBuilder();
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <ModalContent>
        <div>
          <TextField 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
          />
        </div>
        <div className="mt-7">
          <TextArea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description"
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            onClick={() => submitForm({
              title,
              description
            })} 
            className="ml-auto"
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </>
  );
}