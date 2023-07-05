'use client'

import { useCallback, useState, useMemo, useEffect } from "react";
import Header from "@/app/manager/Header";
import HeaderActions from "./HeaderActions";
import Button from "@/components/global/Button";
import { AddIcon, ArrowLeftIcon, PencilIcon, SettingsIcon, VertDotsIcon } from "@/components/global/Icons";
import { useQuery } from "react-query";

import {
  primaryTextColor, 
  secondaryTextColor
} from "@/utils/themeColors";
import { editProgram, getProgram } from "@/api/Program";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import IconButton from "@/components/global/IconButton";

// context and hooks
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useProgram from "@/contexts/Program/useProgram";
import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";
import Board from "./Board";

export default function EditProgram() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    programName,
    programDescription,
    setProgramName,
    setProgramDescription,
    weeks,
    setWeeks,
    programDays,
    setProgramDays,
    handleEditProgramMutation
  } = useProgram();

  const {
    showAddWorkoutModal,
    setShowAddWorkoutModal,
    showWorkoutDetailsModal,
    currentWorkoutDetails,
    setShowWorkoutDetailsModal,
    setCurrentWorkoutDetails
  } = useProgramWorkouts();

  const {
    onDropWorkout
  } = useDraggableWorkout();

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Array<any>>([]);

  // Get program data
  const {
    isLoading,
    isError,
    data: programData,
    error,
    refetch
  } = useQuery('program', () => getProgram(params.id), {
    refetchOnMount: true
  });

  // set weeks
  useEffect(() => {
    if(programData) {
      setWeeks(programData?.weeks)
      setProgramName(programData?.name)
      setProgramDescription(programData?.description)
    }
  }, [programData]);

  // set progamDays via week params
  useEffect(() => {
    if(programData && searchParams.get('week') ) {
      setProgramDays(programData?.weeks[searchParams?.get('week') - 1]?.days)
    }
  }, [searchParams.get('week'), programData]);

  return (
    <div className="edit-program">
      <div className="w-full mb-[50px] flex items-center justify-between">
        <div className="flex gap-[10px] items-center">
          <button onClick={() => router.push("/manager/programs")}>
            <ArrowLeftIcon className={`${primaryTextColor} w-4 h-4`} />
          </button>
          <h5 className={`${primaryTextColor} text-[22px] text-medium`}>
            {programData?.name}
          </h5>
          <IconButton className="ml-1">
            <PencilIcon className={`${primaryTextColor} w-4 h-4`} />
          </IconButton>
        </div>
      </div>
      <HeaderActions weeks={weeks} />
      <Board />
    </div>
  );
};