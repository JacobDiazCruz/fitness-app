'use client';

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, createContext, useReducer, useContext, useMemo, useEffect } from "react";
import useProgram from "./useProgram";

const ProgramWorkoutsContext = createContext();

export const ProgramWorkoutsProvider = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const weekIndex = searchParams.get('week') - 1;
  
  const {
    weeks,
    programName,
    programDescription,
    programDays,
    setProgramDays,
    handleEditProgramMutation
  } = useProgram();

  // modal states
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState<boolean>(false);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [currentWorkoutDetails, setCurrentWorkoutDetails] = useState<CurrentWorkoutDetails>({
    name: "",
    dayName: "",
    description: "",
    exercises: []
  });

  const handleDeleteWorkout = (workout: any, dayIndex: number) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const prevWorkoutIndex = programDays[dayIndex]?.workouts.findIndex(
        wk => wk.secondaryId === workout?.secondaryId
      );
      cloneProgramDays[dayIndex].workouts.splice(prevWorkoutIndex, 1);
      return cloneProgramDays;
    });

    handleEditProgramMutation();
  };
  
  const handleClickWorkout = (workout: any, dayName: string) => {
    const { name, description, exercises } = workout
    setCurrentWorkoutDetails({
      name,
      dayName,
      description,
      exercises
    })
    setShowWorkoutDetailsModal(true);
  };

  /**
   * @Purpose To set the initial editable data of a workout
   * @Note This edited workout is not the same as its original "Workout" data.
   * The program creates another copy of the original workout, and that copy is the one -
   * to be edited in this function.
   */
   const handleEditWorkout = ({
    workoutId,
    workoutSecondaryId,
    workoutIndex,
    dayIndex
  }: {
    workoutId: string;
    workoutSecondaryId: string;
    workoutIndex: number;
    dayIndex: number;
  }) => {
    // set localStorage data to have access to current edited program workout
    localStorage?.setItem("programId", params.id);
    localStorage?.setItem("programName", programName);
    localStorage?.setItem("programDescription", programDescription);
    localStorage?.setItem("programWeeks", JSON.stringify(weeks));

    localStorage?.setItem("programWeekIndex", weekIndex);
    localStorage?.setItem("programDayIndex", dayIndex);
    localStorage?.setItem("programWorkoutIndex", workoutIndex);
    localStorage?.setItem("programWorkoutSecondaryId", workoutSecondaryId);

    router.push(`/manager/workouts/edit/${workoutId}?editProgram=true`);
  };
  
  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      showAddWorkoutModal,
      showWorkoutDetailsModal,
      currentWorkoutDetails,
      setShowAddWorkoutModal,
      setShowWorkoutDetailsModal,
      setCurrentWorkoutDetails,
      handleDeleteWorkout,
      handleClickWorkout,
      handleEditWorkout
    }
  }, [
    showAddWorkoutModal,
    showWorkoutDetailsModal,
    currentWorkoutDetails,
    setShowAddWorkoutModal,
    setShowWorkoutDetailsModal,
    setCurrentWorkoutDetails,
    handleDeleteWorkout,
    handleClickWorkout,
    handleEditWorkout
  ])

  return (
    <ProgramWorkoutsContext.Provider value={value}>
      {children}
    </ProgramWorkoutsContext.Provider>
  );
};

const useProgramWorkouts = () => {
  const context = useContext(ProgramWorkoutsContext)
  if (context === undefined) {
    throw new Error("useProgramWorkouts must be used within workout context")
  }
  return context;
}

export default useProgramWorkouts;