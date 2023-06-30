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
import DraggableWorkouts from "./DraggableWorkouts";
import ProgramDay from "./ProgramDay";

export default function EditProgram() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [draggedWorkout, setDraggedWorkout] = useState(null);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState<boolean>(false);

  // Select Workouts modal states
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Array<any>>([]);

  const [programDays, setProgramDays] = useState([
    { name: "Day 1", workouts: [] },
    { name: "Day 2", workouts: [] },
    { name: "Day 3", workouts: [] },
    { name: "Day 5", workouts: [] },
    { name: "Day 6", workouts: [] },
    { name: "Day 7", workouts: [] }
  ]);
  const [weeks, setWeeks] = useState<Array<any>>([]);
  const [programName, setProgramName] = useState<string>("");
  const [programDescription, setProgramDescription] = useState<string>("");

  // Mutate edit program
  const editProgramMutation = useMutation(editProgram, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

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

  // Handler for edit mutation
  const handleMutateProgram = () => {
    editProgramMutation.mutateAsync({
      id: params.id,
      data: {
        name: programName,
        description: programDescription,
        weeks
      }
    });
  };

  // Remove dragged workout from its previous day and index
  const removeDraggedWorkout = useCallback((prevDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const filteredWorkouts = cloneProgramDays[prevDayIndex].workouts.filter((wk) => wk.secondaryId !== workout.secondaryId)
      cloneProgramDays[prevDayIndex].workouts = filteredWorkouts;
      return cloneProgramDays;
    });
  }, []);

  // Add dragged workout to the designated day
  const addDroppedWorkout = useCallback((currentDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[currentDayIndex].workouts.push(workout);
      return cloneProgramDays;
    });
  }, []);

  // Draggable workout's drop event
  // functions: remove, add, and mutate request
  const handleDrop = async (e, dayIndex) => {
    e.preventDefault();
    const draggedWorkoutData = JSON.parse(e.dataTransfer.getData("application/json"));
    if (draggedWorkoutData) {
      const { prevDayIndex, prevWorkoutIndex, workout } = draggedWorkoutData;
      if(prevDayIndex !== dayIndex) {
        await removeDraggedWorkout(prevDayIndex, workout);
        await addDroppedWorkout(dayIndex, workout);
        await handleMutateProgram();
      }
    }
  };

  return (
    <>
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
      <HeaderActions
        weeks={weeks}
      />
      <div className="flex flex-col md:flex-row gap-[10px]">
        {programDays?.map((day, dayIndex) => (
          <ProgramDay
            dayName={day.name}
            handleDrop={handleDrop}
            setShowAddWorkoutModal={setShowAddWorkoutModal}
            setSelectedDayIndex={setSelectedDayIndex}
            dayIndex={dayIndex}
          >
            {day.workouts.length > 0 && (
              <DraggableWorkouts
                workouts={day.workouts}
                dayIndex={dayIndex}
                dayName={day.name}
                draggedWorkout={draggedWorkout}
                handleMutateProgram={handleMutateProgram}
                setDraggedWorkout={(val) => {
                  setDraggedWorkout(val)
                }}
                weekIndex={searchParams?.get('week') - 1}
                weeks={weeks}
                programName={programName}
                programDescription={programDescription}
                programDays={programDays}
                setProgramDays={(val) => setProgramDays(val)}
                setShowWorkoutDetailsModal={(val) => setShowWorkoutDetailsModal(val)}
              />
            )}
          </ProgramDay>
        ))}
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
    </>
  );
}