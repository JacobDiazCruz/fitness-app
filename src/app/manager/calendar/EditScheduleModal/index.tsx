import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import useCalendarScheduleForm, { CreateScheduleItem, CreateScheduleItemField } from "@/store/Calendar/useCalendarScheduleForm";
import CreateScheduleField from "../CreateScheduleModal/CreateScheduleField";
import { useEffect } from "react";
import { formatStringToValidDate } from "@/utils/formatStringToValidDate";

interface Props {
  onClose: () => void;
  calendarSchedule: any;
};

export default function EditScheduleModal({ 
  onClose,
  calendarSchedule
}: Props) {
  const { 
    submitForm,
    activeTab,
    setShowCreateScheduleModal
  }: any = useCalendarScheduleForm();

  const {
    createScheduleList,
    handleUpdateField
  }: any = useCalendarScheduleForm();

  /**
   * @purpose To render the form based on the selected calendarSchedule type
   * @returns editForm
   */
  const renderForm = () => {
    const editForm = createScheduleList.find((item: CreateScheduleItem) => {
      console.log("calendarSchedule", calendarSchedule)
      if(calendarSchedule.type === item.subType) {
        return item;
      }
    });

    const fieldValues = Object.fromEntries(
      Object.entries(calendarSchedule).map(([key, value]) => {
        if (key === "taggedDate") {
          return [key, formatStringToValidDate(value)];
        }
        return [key, value];
      })
    );
    
    const updatedFields = editForm.fields.map((field: any) => {
      const value = fieldValues[field.name];
      if (value !== undefined) {
        field.value = value;
      }
      return field;
    });

    editForm.fields = updatedFields;
    return editForm;
  };

  const handleSubmit = () => {
    const payload: any = {};

    createScheduleList.forEach((item: CreateScheduleItem) => {
      if(item.title === activeTab) {
        item.fields.forEach((field: CreateScheduleItemField) => {
          payload[field.name] = field.value;
        });
      }
    });

    submitForm(payload);
  };

  return (
    <Modal 
      onClose={onClose} 
      className="w-[550px] h-[600px]"
    >
      <ModalContent>
        <div className="grid grid-cols-12 gap-3">
          {renderForm() && renderForm().fields.map((field: CreateScheduleItemField) => (
            <div key={field.name} style={{ gridColumn: `span ${field.cols || 12}` }}>
              <CreateScheduleField
                field={field}
                handleUpdateField={handleUpdateField}
              />
            </div>
          ))}
        </div>
      </ModalContent>

      <ModalFooter>
        <div className="flex">
          <Button
            onClick={handleSubmit} 
            className="ml-auto"
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};