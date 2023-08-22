import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import useCalendarScheduleForm, { CreateScheduleItem, CreateScheduleItemField } from "@/store/Calendar/useCalendarScheduleForm";
import CreateScheduleField from "../CreateScheduleModal/CreateScheduleField";
import { useEffect, useState } from "react";
import { formatStringToValidDate } from "@/utils/formatStringToValidDate";
import { useMutation } from "react-query";
import { editCalendarSchedule } from "@/api/Calendar";
import useAlert from "@/store/Alert";
import useCalendar from "@/store/Calendar/useCalendar";

interface Props {
  onClose: () => void;
  calendarSchedule: any;
  onEditSuccess: (newData: any) => void;
};

export default function EditScheduleModal({ 
  onClose,
  calendarSchedule,
  onEditSuccess
}: Props) {
  const { dispatchAlert }: any = useAlert();

  const {
    refetchCalendarSchedules
  }: any = useCalendar();

  const {
    createScheduleList
  }: any = useCalendarScheduleForm();

  const [formFields, setFormFields] = useState<any>(null);

  const editCalendarScheduleMutation = useMutation(editCalendarSchedule, {
    onSuccess: async (data) => {
      refetchCalendarSchedules();
      dispatchAlert({
        type: "SUCCESS",
        message: "Calendar schedule edited successfully."
      });
      onEditSuccess(data);
    },
    onError: (err) => {
      console.log(err);
    }
  });

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

    setFormFields(updatedFields);
  };

  useEffect(() => {
    renderForm();
  }, []);

  const handleSubmit = () => {
    const payload: any = {};

    formFields.map((field: CreateScheduleItemField) => {
      payload[field.name] = field.value;
    });

    editCalendarScheduleMutation.mutateAsync({
      id: calendarSchedule._id,
      data: {
        ...payload,
        taggedDate: payload.taggedDate.toLocaleDateString()
      }
    });
  };

  const handleUpdateField = (name: string, value: any) => {
    setFormFields((prevEditForm: any) => {
      const updatedFields = prevEditForm.map((field: CreateScheduleItemField) => {
        if (field.name === name) {
          return {
            ...field,
            value: value
          };
        }
        return field;
      });
  
      return updatedFields;
    });
  };
  

  return (
    <Modal 
      onClose={onClose} 
      className="w-[550px] h-[600px]"
    >
      <ModalContent>
        <div className="grid grid-cols-12 gap-3">
          {formFields?.map((field: CreateScheduleItemField) => (
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
            loading={editCalendarScheduleMutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};