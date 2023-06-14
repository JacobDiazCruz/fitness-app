'use state';

import { useState } from "react";

export default function useExercise() {
  const [initialFilesList, setInitialFilesList] = useState([]);
  const [exerciseForm, setExerciseForm] = useState({
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

  return {
    initialFilesList,
    setInitialFilesList,
    exerciseForm,
    setExerciseForm,
    primayFocusItems,
    setPrimaryFocusItems,
    categoryItems,
    setCategoryItems
  }
}