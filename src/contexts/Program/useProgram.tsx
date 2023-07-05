'use client';

import { editProgram } from "@/api/Program";
import { useParams } from "next/navigation";
import { useState, createContext, useReducer, useContext, useMemo, useEffect, ReactNode } from "react";
import { useMutation } from "react-query";
const ProgramContext = createContext(null);

// USED FOR PROGRAM'S DIRECT ACCESS TO ITS STATES AND REQUESTS
export const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  
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

  // Handler for edit mutation
  const handleEditProgramMutation = () => {
    editProgramMutation.mutateAsync({
      id: params.id,
      data: {
        name: programName,
        description: programDescription,
        weeks
      }
    });
  };
  
  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
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
    }
  }, [
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
  ])

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