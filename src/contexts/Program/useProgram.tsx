'use client';

import { editProgram } from "@/api/Program";
import { useParams, useSearchParams } from "next/navigation";
import { useState, createContext, useContext, ReactNode } from "react";
import { useMutation } from "react-query";
const ProgramContext = createContext(null);

// USED FOR PROGRAM'S DIRECT ACCESS TO ITS STATES AND REQUESTS
export const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const weekId = searchParams.get("week") ?? "";
  
  // form field states
  const [programName, setProgramName] = useState<string>("");
  const [programDescription, setProgramDescription] = useState<string>("");
  const [programWeeks, setProgramWeeks] = useState<string | number | null>(null);

  // edit program states
  const [programDays, setProgramDays] = useState([
    { name: "Day 1", workouts: [] },
    { name: "Day 2", workouts: [] },
    { name: "Day 3", workouts: [] },
    { name: "Day 5", workouts: [] },
    { name: "Day 6", workouts: [] },
    { name: "Day 7", workouts: [] }
  ]);
  const [weeks, setWeeks] = useState<Array<any>>([]);

  // Mutate edit program
  const editProgramMutation = useMutation(editProgram, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  /**
   * @purpose To edit program with the new set of weeks
   * @note Always perform a deep copy first when changing the weeks and days values
   * @note Always transform workout array data to ids before mutating
   * @param updatedWeeks
   * @returns 
   */
  const handleEditProgramMutation = async (updatedWeeks) => {
    if(!updatedWeeks) return;

    const newWeeks = JSON.parse(JSON.stringify(updatedWeeks));
    const newProgramDays = JSON.parse(JSON.stringify(programDays));
    newProgramDays.map((day: any, dayIndex: number) => {
      const workoutIds = day.workouts.map((workout) => workout._id);
      newWeeks[weekId - 1].days[dayIndex].workouts.splice(0, newWeeks[weekId - 1].days[dayIndex].workouts.length, ...workoutIds);
    });

    await editProgramMutation.mutateAsync({
      id: params.id,
      data: {
        name: programName,
        description: programDescription,
        weeks: newWeeks
      }
    });
  };

  // value prop to return all necessary data
  const value = {
    programName,
    programDescription,
    programWeeks,
    programDays,
    weeks,
    setProgramName,
    setProgramDescription,
    setProgramWeeks,
    setProgramDays,
    setWeeks,
    handleEditProgramMutation
  };

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
};

const useProgram = () => {
  const context = useContext(ProgramContext)
  if (context === undefined) {
    throw new Error("useProgram must be used within program context")
  }
  return context;
};

export default useProgram;