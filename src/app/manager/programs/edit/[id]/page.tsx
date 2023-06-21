'use client'

import { useCallback, useState, useMemo, useEffect } from "react";
import Header from "@/app/manager/Header";
import HeaderActions from "./HeaderActions";
import Button from "@/components/global/Button";
import { AddIcon, SettingsIcon, VertDotsIcon } from "@/components/global/Icons";
import SelectWorkoutModal from "./SelectWorkoutModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import { useMutation, useQuery } from "react-query";

import { 
  primaryTextColor, 
  secondaryTextColor 
} from "@/utils/themeColors";
import { editProgram, getProgram } from "@/api/Program";
import { useParams, useSearchParams } from "next/navigation";
import IconButton from "@/components/global/IconButton";
import TableItemActions from "@/components/global/TableItemActions";

// Mapped workouts
const MappedWorkouts = ({ 
  workouts, 
  dayIndex,
  draggedWorkout,
  setDraggedWorkout,
  setShowWorkoutDetailsModal,
  handleMutateProgram,
  programDays,
  setProgramDays
}) => {
  const onDragEnter = ((e, workout, index, dayIndex) => {
    e.preventDefault();

    const targetIndex = programDays[dayIndex]?.workouts.findIndex(
      workout => workout.secondaryId === draggedWorkout?.secondaryId
    );

    if (targetIndex !== -1) {
      const updatedArr = [...programDays];
      const workoutsArr = [...updatedArr[dayIndex]?.workouts];
  
      workoutsArr.splice(targetIndex, 1);
      workoutsArr.splice(index, 0, draggedWorkout);

      updatedArr[dayIndex].workouts = workoutsArr;
      setProgramDays(updatedArr);
    }
  });

  const handleDelete = (workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const prevWorkoutIndex = programDays[dayIndex]?.workouts.findIndex(
        wk => wk.secondaryId === workout?.secondaryId
      );
      cloneProgramDays[dayIndex].workouts.splice(prevWorkoutIndex, 1);
      return cloneProgramDays;
    });

    handleMutateProgram();
  }

  return (
    <>
      {workouts.map((workout, index) => (
        <div
          key={workout.secondaryId}
          className="relative"
          onClick={() => setShowWorkoutDetailsModal(true)}
        >
          <div
            className="dark:bg-neutral-900 bg-gray-300 w-full rounded-lg h-[60px] absolute mt-2"
            style={{
              display: draggedWorkout === workout ? "block" : "none"
            }}
          ></div>
          <div
            draggable
            onDragStart={e => {
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify({ 
                  prevWorkoutIndex: index,
                  prevDayIndex: dayIndex,
                  workout
                })
              );
              setDraggedWorkout(workout);
            }}
            onDragEnter={e => onDragEnter(e, workout, index, dayIndex)}
            onDrop={e => {
              e.preventDefault();
              setDraggedWorkout(null);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnd={(e) => {
              e.preventDefault();
              setDraggedWorkout(null)
            }}
            className="w-full flex justify-between bg-white dark:bg-neutral-800 rounded-lg mt-2 p-3 cursor-pointer shadow-md"
            style={{
              opacity: draggedWorkout === workout ? "0.01" : "1"
            }}
          >
            <div>
              <h5 className={`${primaryTextColor} text-[14px] font-medium`}>
                {workout.name}
              </h5>
              <p className={`${secondaryTextColor} text-[12px] mt-1 text-normal`}>
                {workout.exercises.length} exercises
              </p>
            </div>
            <TableItemActions
              editPath={`/manager/exercises/edit`}
              handleDelete={() => handleDelete(workout)}
            />
          </div>
        </div>
      ))}
    </>
  )
};

export default function EditProgram() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [draggedWorkout, setDraggedWorkout] = useState(null);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState<boolean>(false);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);

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

  // mutate edit program
  const editProgramMutation = useMutation(editProgram, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // get exercise data
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
    if(programData) {
      setProgramDays(programData?.weeks[searchParams?.get('week') - 1].days)
    }
  }, [searchParams.get('week'), programData]);

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

  const removeDraggedWorkout = useCallback((prevDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const filteredWorkouts = cloneProgramDays[prevDayIndex].workouts.filter((wk) => wk.secondaryId !== workout.secondaryId)
      cloneProgramDays[prevDayIndex].workouts = filteredWorkouts;
      return cloneProgramDays;
    });
  }, []);

  const addDroppedWorkout = useCallback((currentDayIndex, workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[currentDayIndex].workouts.push(workout);
      return cloneProgramDays;
    });
  }, []);

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
      <Header pageTitle={programData?.name} />
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
                <MappedWorkouts 
                  workouts={day.workouts} 
                  dayIndex={dayIndex}
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
        {showWorkoutDetailsModal && (
          <WorkoutDetailsModal
            onClose={() => setShowWorkoutDetailsModal(false)}
          />
        )}
      </div>
    </>
  );
}