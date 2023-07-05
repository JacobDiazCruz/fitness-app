'use client'

import { useCallback, useState, useMemo, useEffect } from "react";
import Header from "@/app/manager/Header";
import HeaderActions from "./HeaderActions";
import Button from "@/components/global/Button";
import { AddIcon, ArrowLeftIcon, PencilIcon, SettingsIcon, VertDotsIcon } from "@/components/global/Icons";
import SelectWorkoutModal from "./SelectWorkoutModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import { useMutation, useQuery } from "react-query";

import {
  primaryTextColor, 
  secondaryTextColor
} from "@/utils/themeColors";
import { editProgram, getProgram } from "@/api/Program";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import IconButton from "@/components/global/IconButton";
import SelectedWorkout from "./SelectedWorkout";

// child components
import DayWrapper from "./DayWrapper";
import DraggableWorkout from "./DraggableWorkout";

// context and hooks
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useProgram from "@/contexts/Program/useProgram";
import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";

DraggableWorkout.SelectedWorkout = SelectedWorkout;

export default function Board() {
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

  return (
    <div className="program-board flex flex-col md:flex-row gap-[10px]">
      {programDays?.map((day, dayIndex) => (
        <DayWrapper
          dayName={day.name}
          dayIndex={dayIndex}
          handleDrop={onDropWorkout}
          setSelectedDayIndex={setSelectedDayIndex}
          handleEditProgramMutation={handleEditProgramMutation}
        >
          {day.workouts.length > 0 && (
            <DraggableWorkout
              workouts={day.workouts}
              dayIndex={dayIndex}
              dayName={day.name}
            >
              <DraggableWorkout.SelectedWorkout />
            </DraggableWorkout>
          )}
        </DayWrapper>
      ))}
      {showWorkoutDetailsModal && (
        <WorkoutDetailsModal />
      )}
      {showAddWorkoutModal && (
        <SelectWorkoutModal
          onClose={() => setShowAddWorkoutModal(false)}
          setSelectedWorkouts={setSelectedWorkouts}
          setProgramDays={setProgramDays}
          programName={programName}
          programDescription={programDescription}
          selectedDayIndex={selectedDayIndex}
          weeks={weeks}
        />
      )}
    </div>
  );
};