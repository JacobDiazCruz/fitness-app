import { createContext, useReducer, useContext, useMemo } from "react";
import workoutReducer, { initialState } from "./reducer";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const toggleDarkMode = (val) => {
    dispatch({
      type: "TOGGLE",
      darkMode: val
    })
  };

  const setWorkoutName = (val) => {
    dispatch({
      type: "TOGGLE",
      setWorkoutName: ""
    })
  };

  // VALUE context prop
  const value = useMemo(() => {
    return {
      toggleDarkMode,
      darkMode: state.darkMode
    }
  }, [
    toggleDarkMode,
    state.darkMode
  ])

  return (
    <WorkoutContext.Provider value={value}>
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
}

export default useWorkout;