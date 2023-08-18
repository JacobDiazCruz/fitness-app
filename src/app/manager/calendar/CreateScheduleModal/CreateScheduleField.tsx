import React from "react";
import FieldName from "@/components/global/FieldName";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import useCreateScheduleForm, { CreateScheduleItemField } from "@/hooks/useCreateScheduleForm";
import AutoComplete from "@/components/global/AutoComplete";
import DatePickerField from "@/components/global/DatePickerField";

interface CreateScheduleFormProps {
  field: CreateScheduleItemField;
  handleUpdateField: (fieldName: string, newValue: string) => void; 
};

export default function CreateScheduleField({
  field,
  handleUpdateField,
}: CreateScheduleFormProps) {
  const { name, label, placeholder, type, items, startIcon, value, validations } = field;
  const { triggerValidations } = useCreateScheduleForm();

  const Label = () => {
    return (
      <>
        {label && (
          <FieldName>{label}</FieldName>
        )}
      </>
    );
  };

  switch (type) {
    case "text":
      return (
        <div className="mb-5">
          <Label />
          <TextField
            value={value}
            onChange={(e) => {
              triggerValidations(name, e.target.value, validations);
              handleUpdateField(name, e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="mb-5">
          <Label />
          <TextArea
            value={value}
            onChange={(e) => {
              triggerValidations(name, e.target.value, validations);
              handleUpdateField(name, e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
      );
    case "autocomplete":
      return (
        <div className="mb-5">
          <Label />
          <AutoComplete
            startIcon={startIcon}
            placeholder={placeholder}
            items={items || []}
            value={value}
            onChange={(val) => {
              const res = triggerValidations(name, e.target.value, validations);
              console.log("res", res)
              handleUpdateField(name, val)
            }}
            // removeSelectedItem={(val) => setSelectedWorkout(null)}
          />
        </div>
      );
    case "datepicker":
      return (
        <div className="mb-5">
          <Label />
          <DatePickerField
            value={value}
            onChange={(value: any) => handleUpdateField(name, value)}
          />
        </div>
      );
    default:
      return <></>;
  };
};