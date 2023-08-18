import React from "react";
import FieldName from "@/components/global/FieldName";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import { CreateScheduleItemField } from "@/hooks/useCreateScheduleForm";
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
  const { name, label, placeholder, type, items, startIcon, value } = field;

  switch (type) {
    case "text":
      return (
        <div className="mb-5">
          <FieldName>{label}</FieldName>
          <TextField
            value={value}
            onChange={(e) => {
              handleUpdateField(name, e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="mb-5">
          <FieldName>{label}</FieldName>
          <TextArea
            value={value}
            onChange={(e) => {
              handleUpdateField(name, e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
      );
    case "autocomplete":
      return (
        <div className="mb-5">
          {label && (
            <FieldName>{label}</FieldName>
          )}
          <AutoComplete
            startIcon={startIcon}
            placeholder={placeholder}
            items={items || []}
            value={value}
            onChange={(val) => {
              handleUpdateField(name, val)
            }}
            // removeSelectedItem={(val) => setSelectedWorkout(null)}
          />
        </div>
      );
    case "datepicker":
      return (
        <div className="mb-5">
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