'use state';

import { IExerciseFormSection, IExerciseStore } from "@/types/exercise";
import { createContext, ReactNode, useContext, useState } from "react";

const ExerciseContext = createContext<IExerciseStore>(
  // @ts-ignore
  null
);

export default function ExerciseProvider({
  children
}: {
  children: ReactNode;
}) {
  const [initialFilesList, setInitialFilesList] = useState([]);

  const required = (value: string) => !!value;

  const [primaryFocusItems] = useState([
    "Biceps",
    "Upper Chest",
    "Middle Chest",
    "Lower Chest",
    "Triceps",
    "Upper Back"
  ]);
  const [categoryItems, setCategoryItems] = useState([
    "Weights",
    "Bodyweight",
    "Timed",
    "Distance"
  ]);
  
  const [exerciseForm, setExerciseForm] = useState<IExerciseFormSection[]>([
    {
      section: "Basic details",
      fields: [
        {
          label: "Exercise name *",
          fieldName: "name",
          placeholder: "e.g. Incline dumbbell press",
          fieldType: "textfield",
          value: "",
          validator: [required]
        },
        {
          label: "Primary focus *",
          fieldName: "primaryFocus",
          fieldType: "autocomplete",
          placeholder: "Choose one",
          value: "",
          items: primaryFocusItems,
          validator: [required]
        },
        {
          label: "Category *",
          fieldName: "category",
          fieldType: "autocomplete",
          placeholder: "Choose one",
          value: "",
          items: categoryItems,
          validator: [required]
        },
        {
          label: "Instruction",
          fieldName: "instruction",
          fieldType: "textarea",
          placeholder: "Write instructions / notes",
          value: "",
          validator: []
        }
      ]
    },
    {
      section: "Video",
      fields: [
        {
          label: "Video *",
          fieldName: "videoLink",
          fieldType: "textfield",
          placeholder: "Paste a link from Youtube",
          value: "",
          validator: [required]
        },
        {
          label: "Upload images or videos",
          subLabel: "Upload your own workout videos and images.",
          fieldName: "files",
          fieldType: "upload",
          value: initialFilesList,
          validator: []
        }
      ]
    }
  ]);

  const isExerciseFormValid = exerciseForm.every((form: any) =>
    form.fields.every((field: any) =>
      field.validator.every((validateFn: any) => validateFn(field.value))
    )
  );

  const value: IExerciseStore = {
    isExerciseFormValid,
    initialFilesList,
    setInitialFilesList,
    exerciseForm,
    setExerciseForm,
    primaryFocusItems,
    categoryItems,
    setCategoryItems
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext)
  if (context === undefined) {
    throw new Error("useExercise must be used within exercise context")
  }
  return context;
};