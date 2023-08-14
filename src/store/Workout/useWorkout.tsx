"use client";

import { IChildProps } from "@/types/global";
import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  selectedExercises: []
};

export const ACTIONS = {
  ADD_SELECTED_EXERCISE: "ADD_SELECTED_EXERCISE",
  SET_SELECTED_EXERCISES: "SET_SELECTED_EXERCISES",
  UPDATE_SELECTED_EXERCISE: "UPDATE_SELECTED_EXERCISE",
  RESET_SELECTED_EXERCISES: "RESET_SELECTED_EXERCISES",
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const WorkoutContext = createContext<{
  state: any;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

const reducer = (state: any, action: Action) => {
  switch(action.type) {
    case ACTIONS.SET_SELECTED_EXERCISES:
      return {
        ...state,
        selectedExercises: action.data
      };
    case ACTIONS.ADD_SELECTED_EXERCISE:
      return {
        ...state,
        selectedExercises: [...state.selectedExercises, action.data]
      };
    case ACTIONS.UPDATE_SELECTED_EXERCISE: {
      const { exerciseIndex, setIndex, field, value } = action.data;
      const updatedExercises = state.selectedExercises.map(
        (exercise: any, idx: number) => {
          if (idx === exerciseIndex) {
            const updatedSets = [...exercise.sets];
            updatedSets[setIndex] = {
              ...updatedSets[setIndex],
              [field]: value
            };
            return { ...exercise, sets: updatedSets };
          }
          return exercise;
        }
      );
      return { ...state, selectedExercises: updatedExercises };
    }
    default:
      return state;
  }
};


export const WorkoutProvider = ({ children }: IChildProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WorkoutContext.Provider 
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkout = () => {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within workout context")
  }
  return context;
};

export default useWorkout;