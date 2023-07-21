import Modal, { ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import EventSchedule from "./EventSchedule";
import ProgramSchedule from "./ProgramSchedule";
import WorkoutSchedule from "./WorkoutSchedule";
import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import TaskSchedule from "./TaskSchedule";
import useCalendarCell from "@/contexts/Calendar/useCalendarCell";

type CreateScheduleItem = {
  type: string;
  title: string;
};

const createScheduleList: CreateScheduleItem[] = [
  {
    type: "CREATE_EVENT",
    title: "Event",
  },
  {
    type: "CREATE_TASK",
    title: "Task",
  },
  {
    type: "CREATE_WORKOUT",
    title: "Workout",
  },
  {
    type: "CREATE_PROGRAM",
    title: "Program",
  },
];

export default function CreateScheduleModal() {

  const { 
    activeTab,
    setActiveTab,
    setShowCreateScheduleModal,
  }: any = useCalendarScheduleBuilder(); 

  const RenderScheduleComponent = () => {
    switch (activeTab) {
      case "Event":
        return <EventSchedule />;
      case "Program":
        return <ProgramSchedule />;
      case "Workout":
        return <WorkoutSchedule />;
      case "Task":
        return <TaskSchedule />;
      default:
        return <></>;
    }
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
          {createScheduleList.map((item) => (
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
      <RenderScheduleComponent />
    </Modal>
  );
};