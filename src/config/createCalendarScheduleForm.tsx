import { primaryTextColor } from "@/utils/themeColors"
import { timesList } from "@/utils/timesList"
import { required } from "@/utils/validations"
import { LuDumbbell } from "react-icons/lu"

export const DATE_AND_TIME = [
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
]

export const CREATE_SCHEDULE_LIST = [
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
      ...DATE_AND_TIME,
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
      ...DATE_AND_TIME
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
      ...DATE_AND_TIME
    ]
  }
]