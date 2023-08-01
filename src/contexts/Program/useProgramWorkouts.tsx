"use client";

import { editProgramWorkout, listProgramWorkouts } from "@/api/Program";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useState,
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useMutation, useQuery } from "react-query";
import useProgram from "./useProgram";

const ProgramWorkoutsContext = createContext();

export const ProgramWorkoutsProvider = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const weekId: string = searchParams.get("week") ?? "";
  const weekIndex = searchParams.get("week") - 1;

  const {
    weeks,
    programName,
    programDescription,
    programDays,
    setProgramDays,
    handleEditProgramMutation
  } = useProgram();

  // update essentials
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedDayCount, setSelectedDayCount] = useState<number | null>(null);

  // modal states
  const [showAddWorkoutModal, setShowAddWorkoutModal] =
    useState<boolean>(false);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] =
    useState<boolean>(false);
  const [currentWorkoutDetails, setCurrentWorkoutDetails] =
    useState<CurrentWorkoutDetails>({
      name: "",
      dayName: "",
      description: "",
      exercises: [],
    });
  
  const [programWorkouts, setProgramWorkouts] = useState<any>([]);
    
  /**
   * @purpose to list program workouts
   * @params programId
   * @params weekId
   */
  const {
    isLoading: isLoadingProgramWorkouts,
    data: programWorkoutsData,
    refetch: refetchProgramWorkouts,
  } = useQuery(
    "programWorkouts",
    () =>
      listProgramWorkouts({
        programId: params.id,
        weekId,
      }),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  // Mutate edit program's workout
  const editProgramWorkoutMutation = useMutation(editProgramWorkout, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if(programWorkoutsData) {
      setProgramWorkouts(programWorkoutsData)
    }
  }, [programWorkoutsData]);

  const handleDeleteWorkout = (workout: any, dayIndex: number) => {
    setProgramDays((prevProgramDays) => {
      const cloneProgramDays = [...prevProgramDays];
      const prevWorkoutIndex = programDays[dayIndex]?.workouts.findIndex(
        (wk) => wk.secondaryId === workout?.secondaryId
      );
      cloneProgramDays[dayIndex].workouts.splice(prevWorkoutIndex, 1);
      return cloneProgramDays;
    });

    handleEditProgramMutation();
  };

  const handleClickWorkout = (workout: any, dayIndex: string) => {
    const { name, description, exercises } = workout;
    setCurrentWorkoutDetails({
      name,
      dayName: `Day ${dayIndex + 1}`,
      description,
      exercises,
    });
    setShowWorkoutDetailsModal(true);
  };

  /**
   * @purpose To set the initial editable data of a workout
   * @note This edited workout is not the same as its original "Workout" data.
   * The program creates another copy of the original workout, and that copy is the one -
   * to be edited in this function.
   */
  const handleEditWorkout = ({
    workoutId,
    workoutSecondaryId,
    workoutIndex,
    dayIndex,
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
  const value = {
    programWorkouts,
    programWorkoutsData,
    setProgramWorkouts,
    selectedDayCount,
    setSelectedDayCount,
    refetchProgramWorkouts,
    editProgramWorkoutMutation,
    isLoadingProgramWorkouts,
    selectedDayIndex,
    showAddWorkoutModal,
    showWorkoutDetailsModal,
    currentWorkoutDetails,
    setSelectedDayIndex,
    setShowAddWorkoutModal,
    setShowWorkoutDetailsModal,
    setCurrentWorkoutDetails,
    handleDeleteWorkout,
    handleClickWorkout,
    handleEditWorkout,
  };

  return (
    <ProgramWorkoutsContext.Provider value={value}>
      {children}
    </ProgramWorkoutsContext.Provider>
  );
};

const useProgramWorkouts = () => {
  const context = useContext(ProgramWorkoutsContext);
  if (context === undefined) {
    throw new Error("useProgramWorkouts must be used within workout context");
  }
  return context;
};

export default useProgramWorkouts;
