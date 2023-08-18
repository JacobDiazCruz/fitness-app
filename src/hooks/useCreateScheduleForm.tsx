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
        }
      ]
    },
    {
      type: "CREATE_EVENT",
      title: "Event",
      fields: [
        {
          name: "title",
          label: "Titledsds",
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
        {
          name: "date",
          label: "",
          placeholder: "",
          cols: 6,
          type: "datepicker",
          value: "",
          validations: []
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
      ]
    },
    {
      type: "CREATE_PROGRAM",
      title: "Program",
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
  ]);

  const {
    data: workouts
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
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

  return {
    createScheduleList,
    setCreateScheduleList
  }
};