import { listPrograms } from "@/api/Program";
import { listWorkouts } from "@/api/Workout";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
import { required } from "@/utils/validations";
import { useEffect, useState } from "react";
import { LuDumbbell } from "react-icons/lu";
import { useQuery } from "react-query";

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

export default function useCreateScheduleForm() {
  const [dateAndTime] = useState([
    {
      name: "taggedDate",
      label: "",
      placeholder: "",
      cols: 6,
      type: "datepicker",
      value: "",
      validations: [required]
    },
    {
      name: "startTime",
      label: "",
      placeholder: "",
      type: "autocomplete",
      cols: 3,
      value: "",
      items: timesList,
      validations: []
    },
    {
      name: "endTime",
      label: "",
      placeholder: "",
      type: "autocomplete",
      value: "",
      cols: 3,
      items: timesList,
      validations: []
    }
  ]);

  const [createScheduleList, setCreateScheduleList] = useState([
    {
      type: "CREATE_SESSION",
      title: "Session",
      fields: [
        {
          name: "title",
          label: "Title",
          cols: 12,
          placeholder: "Add title",
          type: "text",
          value: "",
          validations: [
            required
          ]
        },
        {
          name: "description",
          label: "Description",
          cols: 12,
          placeholder: "Add title",
          type: "textarea",
          value: "",
          validations: []
        },
        ...dateAndTime,
        {
          name: "meetingLink",
          label: "Meeting link",
          cols: 12,
          placeholder: "Paste meeting link from Google Calendar, Zoom, or other.",
          type: "text",
          value: "",
          validations: []
        },
      ]
    },
    {
      type: "CREATE_EVENT",
      title: "Event",
      fields: [
        {
          name: "title",
          label: "Title",
          placeholder: "Add title",
          type: "text",
          value: "",
          validations: []
        },
        {
          name: "description",
          label: "Description",
          placeholder: "Add title",
          type: "textarea",
          value: "",
          validations: []
        }
      ]
    },
    {
      type: "CREATE_WORKOUT",
      title: "Workout",
      fields: [
        {
          name: "workoutDetails",
          label: "Select a workout",
          placeholder: "Select a workout",
          type: "autocomplete",
          value: "",
          cols: 12,
          items: [],
          startIcon: <LuDumbbell className={`w-3 h-3 fill-white ${primaryTextColor}`} />,
          validations: []
        },
        ...dateAndTime
      ]
    },
    {
      type: "CREATE_PROGRAM",
      title: "Program",
      fields: [
        {
          name: "programDetails",
          label: "Select a program",
          placeholder: "Select a program",
          type: "autocomplete",
          value: "",
          cols: 12,
          items: [],
          validations: []
        },
        ...dateAndTime
      ]
    },
  ]);

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

  return {
    createScheduleList,
    setCreateScheduleList,
    triggerValidations
  }
};