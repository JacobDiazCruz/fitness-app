import { listPrograms } from "@/api/Program";
import { listWorkouts } from "@/api/Workout";
import { primaryTextColor } from "@/utils/themeColors";
import { timesList } from "@/utils/timesList";
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
  validations: any[];
};

export type CreateScheduleItem = {
  type: string;
  title: string;
  fields: CreateScheduleItemField[];
};

export default function useCreateScheduleForm() {
  const [dateAndTime] = useState([
    {
      name: "formDate",
      label: "",
      placeholder: "",
      cols: 6,
      type: "datepicker",
      value: "",
      validations: []
    },
    {
      name: "formStartTime",
      label: "",
      placeholder: "",
      type: "autocomplete",
      cols: 3,
      value: "",
      items: timesList,
      validations: []
    },
    {
      name: "formEndTime",
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
          validations: []
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
        ...dateAndTime
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
          name: "workout",
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
          name: "program",
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
    setCreateScheduleList((prevList) =>
      prevList.map((item) => {
        if (item.type === "CREATE_WORKOUT") {
          return {
            ...item,
            fields: item.fields.map((field) =>
              field.name === "workout" ? { ...field, items: workouts } : field
            ),
          };
        }
        return item;
      })
    );
  }, [workouts]);

  useEffect(() => {
    // Update items in createScheduleList when programs change
    setCreateScheduleList((prevList) =>
      prevList.map((item) => {
        if (item.type === "CREATE_PROGRAM") {
          return {
            ...item,
            fields: item.fields.map((field) =>
              field.name === "program" ? { ...field, items: programs } : field
            ),
          };
        }
        return item;
      })
    );
  }, [programs]);

  return {
    createScheduleList,
    setCreateScheduleList
  }
};