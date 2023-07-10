'use state';

import { ExerciseContext, ExerciseForm } from "@/utils/exerciseTypes";
import { createContext, ReactNode, useContext, useState } from "react";

const ExerciseContext = createContext<ExerciseContext | null>(null);

export default function ExerciseProvider({
  children
}: {
  children: ReactNode;
}) {
  const [initialFilesList, setInitialFilesList] = useState([]);
  const [exerciseForm, setExerciseForm] = useState<ExerciseForm>({
    name: "",
    primaryFocus: "",
    category: "",
    instruction: "",
    videoLink: "",
    files: []
  });

  const [primayFocusItems, setPrimaryFocusItems] = useState([
    {
      name: "Biceps"
    },
    {
      name: "Upper Chest"
    },
    {
      name: "Middle Chest"
    },
    {
      name: "Lower Chest"
    },
    {
      name: "Triceps"
    },
    {
      name: "Upper Back"
    }
  ]);
  const [categoryItems, setCategoryItems] = useState([
    {
      name: "Weights"
    },
    {
      name: "Bodyweight"
    },
    {
      name: "Timed"
    },
    {
      name: "Distance"
    }
  ]);

  const value = {
    initialFilesList,
    setInitialFilesList,
    exerciseForm,
    setExerciseForm,
    primayFocusItems,
    setPrimaryFocusItems,
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