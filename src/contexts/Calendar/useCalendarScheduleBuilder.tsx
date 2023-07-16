import { createCalendarSchedule } from "@/api/Calendar";
import { CalendarScheduleType } from "@/utils/calendarTypes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import useAlert from "../Alert";
import useCalendar from "./useCalendar";

const CalendarScheduleBuilderContext = createContext(null);

export const CalendarScheduleBuilderProvider = ({ 
  children 
}: {
  children: ReactNode;
}) => {
  const { dispatchAlert }: any = useAlert();
  const createCalendarScheduleMutation = useMutation(createCalendarSchedule);
  const { refetchCalendarSchedules } = useCalendar();

  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<CalendarScheduleType>('Event');
  
  /**
   * @purpose To add/create a new calendar item
   * @action createCalendarScheduleMutation
   */
   const submitForm = async (data: any) => {
    try {
      const date = new Date(data.taggedDate);
      const formattedDate = date.toLocaleDateString("en-US");

      const res = await createCalendarScheduleMutation.mutateAsync({
        data: {
          ...data,
          taggedDate: formattedDate
        },
        type: activeTab
      });
      
      if(!res.success) throw Error(res.message);

      dispatchAlert({
        type: "SUCCESS",
        message: res.message
      });

      refetchCalendarSchedules();
      setShowCreateScheduleModal(false);
    } catch(err) {
      console.log(err);
      dispatchAlert({
        type: "ERROR",
        message: "There's something wrong in creating a calendar item. Please try again."
      });
    }
  };

  const value = {
    showCreateScheduleModal,
    setShowCreateScheduleModal,
    activeTab,
    setActiveTab,
    submitForm
  };

  return (
    <CalendarScheduleBuilderContext.Provider value={value}>
      {children}
    </CalendarScheduleBuilderContext.Provider>
  );
};

const useCalendarScheduleBuilder = () => {
  const context = useContext(CalendarScheduleBuilderContext)
  if (context === undefined) {
    throw new Error("useCalendarScheduleBuilder must be used within useCalendarScheduleBuilder context")
  }
  return context;
};

export default useCalendarScheduleBuilder;