import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import CreateScheduleField from "./CreateScheduleField";
import useCalendarScheduleForm, { CreateScheduleItem, CreateScheduleItemField } from "@/store/Calendar/useCalendarScheduleForm";

export default function CreateScheduleModal() {
  const { 
    submitForm,
    activeTab,
    setActiveTab,
    setShowCreateScheduleModal
  }: any = useCalendarScheduleForm();

  const {
    createScheduleList,
    handleUpdateField
  }: any = useCalendarScheduleForm();

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
      onClose={() => {
        setShowCreateScheduleModal(false);
      }} 
      className="w-[550px] h-[700px]"
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
            // tailwind col-span is inconsistent
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