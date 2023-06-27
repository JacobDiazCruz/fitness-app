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
      <div className="flex gap-[10px]">
        {programDays?.map((day, dayIndex) => (
          <div
            key={day.name}
            data-index={dayIndex}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, dayIndex)}
            className="day-board h-[100vh] dark:border-neutral-800 dark:border dark:border-solid dark:bg-neutral-950 bg-[#f7f7f7] w-full p-2 shadow-sm rounded-md"
          >
            <div className="flex justify-between items-center">
              <p className="uppercase text-[12px] text-gray-500 ml-1">{day.name}</p>
              <button
                variant="outlined"
                className="group h-[32px] flex items-center dark:border-neutral-700 border-gray-200 border-solid border rounded-lg px-2"
                onClick={() => {
                  setShowAddWorkoutModal(true);
                  setSelectedDayIndex(dayIndex);
                }}
              >
                <AddIcon className={`${primaryTextColor} w-3 h-3`} />
                <span className="absolute mt-[60px] z-[99] scale-0 transition-all rounded-lg bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  Add workout
                </span>
              </button>
            </div>
            <div className="mt-3">
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
                  programDays={programDays}
                  setProgramDays={(val) => setProgramDays(val)}
                  setShowWorkoutDetailsModal={(val) => setShowWorkoutDetailsModal(val)}
                />
              )}
            </div>
          </div>
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