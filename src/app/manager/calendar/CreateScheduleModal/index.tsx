import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import useCalendarScheduleBuilder from "@/store/Calendar/useCalendarScheduleBuilder";
import CreateScheduleField from "./CreateScheduleField";
import useCreateScheduleForm, { CreateScheduleItem, CreateScheduleItemField } from "@/hooks/useCreateScheduleForm";

export default function CreateScheduleModal() {
  const { 
    activeTab,
    setActiveTab,
    submitForm,
    setShowCreateScheduleModal
  }: any = useCalendarScheduleBuilder();

  const {
    createScheduleList,
    setCreateScheduleList
  }: any = useCreateScheduleForm();

  const handleUpdateField = (fieldName: string, newValue: any) => {
    setCreateScheduleList((prevList: CreateScheduleItem[]) =>
      prevList.map((item) => {
        if (item.title !== activeTab) return item;

        const updatedFields = item.fields.map((field: CreateScheduleItemField) => {
          if (field.name === fieldName) {
            return { ...field, value: newValue };
          } else {
            return field;
          }
        });

        return { ...item, fields: updatedFields };
      })
    );
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

    console.log("payload", payload);
    // submitForm(payload);
  };

  return (
    <Modal 
      onClose={() => {
        setShowCreateScheduleModal(false);
      }} 
      className="w-[550px] h-[600px]"
    >
      <ModalHeader>
        <ModalTitle>Create Schedule</ModalTitle>
        <div className="flex gap-[10px] mt-5">
          {createScheduleList?.map((item: any) => (
            <Button
              key={item.title}
              variant={activeTab === item.title ? "contained" : "outlined"}
              onClick={() => setActiveTab(item.title)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </ModalHeader>

      <ModalContent>
        <div className="grid grid-cols-12 gap-3">
          {createScheduleList?.find((item: any) => item.title === activeTab)?.fields.map((field: CreateScheduleItemField) => (
            // col-span having problems with tailwind
            <div style={{ gridColumn: `span ${field.cols || 12}` }}>
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