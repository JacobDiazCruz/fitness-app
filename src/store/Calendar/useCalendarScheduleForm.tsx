"use client";

import { createCalendarSchedule } from "@/api/Calendar";
import { listPrograms } from "@/api/Program";
import { listWorkouts } from "@/api/Workout";
import { CREATE_SCHEDULE_LIST } from "@/config/createCalendarScheduleForm";
import { DayTime } from "@/utils/calendarTypes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAlert from "../Alert";
import useCalendar from "./useCalendar";

const CalendarScheduleFormContext: any = createContext(null);

export type CreateScheduleItemField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  value: string | number;
  items?: any[];
  startIcon?: any;
  cols?: number;
  validations?: any;
};

export type CreateScheduleItem = {
  type: string;
  title: string;
  fields: CreateScheduleItemField[];
};

export const CalendarScheduleFormProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { dispatchAlert }: any = useAlert();
  const createCalendarScheduleMutation = useMutation(createCalendarSchedule);
  const { refetchCalendarSchedules }: any = useCalendar();

  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Event");

  // form date and time
  const [formDate, setFormDate] = useState<string>("");
  const [formStartTime, setFormStartTime] = useState<DayTime | null>(null);
  const [formEndTime, setFormEndTime] = useState<DayTime | null>(null);

  const [createScheduleList, setCreateScheduleList] = useState(CREATE_SCHEDULE_LIST);

  const {
    data: workouts
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const {
    data: programs
  } = useQuery('programs', () => {
    const userRole = localStorage?.getItem("userRole");
    return listPrograms(userRole == "Client" ? "Client" : "");
  });

  useEffect(() => {
    // Update items in createScheduleList when workouts change
    setCreateScheduleList((prevList: any) =>
      prevList.map((item: CreateScheduleItem) => {
        if (item.type === "CREATE_WORKOUT") {
          return {
            ...item,
            fields: item.fields.map((field) =>
              field.name === "workoutDetails" ? { ...field, items: workouts } : field
            ),
          };
        }
        return item;
      })
    );
  }, [workouts]);

  useEffect(() => {
    // Update items in createScheduleList when programs change
    setCreateScheduleList((prevList: any) =>
      prevList.map((item: CreateScheduleItem) => {
        if (item.type === "CREATE_PROGRAM") {
          return {
            ...item,
            fields: item.fields.map((field) =>
              field.name === "programDetails" ? { ...field, items: programs } : field
            ),
          };
        }
        return item;
      })
    );
  }, [programs]);

  // Function to trigger validations for a specific field
  const triggerValidations = (fieldName: string, fieldValue: string, validations: any[]) => {

    for (const validation of validations) {
      console.log("validation(fieldValue)", validation(fieldValue, fieldName))
      if (!validation(fieldValue, fieldName)) {
        // Validation failed
        return false;
      }
    }
    
    // All validations passed
    return true;
  };

  const handleUpdateField = (fieldName: string, newValue: any) => {
    setCreateScheduleList((prevList: any) =>
      prevList.map((item: any) => {
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
    createScheduleList,
    setCreateScheduleList,
    handleUpdateField,
    triggerValidations,
    formDate,
    formStartTime,
    formEndTime,
    setFormDate,
    setFormStartTime,
    setFormEndTime,
    showCreateScheduleModal,
    setShowCreateScheduleModal,
    activeTab,
    setActiveTab,
    submitForm
  }

  return (
    <CalendarScheduleFormContext.Provider value={value}>
      {children}
    </CalendarScheduleFormContext.Provider>
  );
};

const useCalendarScheduleForm = () => {
  const context = useContext(CalendarScheduleFormContext)
  if (context === undefined) {
    throw new Error("useCalendarScheduleForm must be used within CalendarScheduleFormContext context")
  }
  return context;
};

export default useCalendarScheduleForm;