'use client'

import { useCallback, useState, useMemo } from "react";
import Header from "@/components/manager/Header";
import HeaderActions from "./HeaderActions";
import Button from "@/components/global/Button";
import { AddIcon } from "@/components/global/Icons";
import SelectWorkoutModal from "./SelectWorkoutModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";

export default function EditProgram() {
  const [draggedWorkout, setDraggedWorkout] = useState(null);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState<boolean>(false);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [programDays, setProgramDays] = useState([
    {
      name: "Day 1",
      workouts: [
        {
          name: "Leg workout",
          exercises: [
            {
              name: "Leg curl",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            },
            {
              name: "Squats",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            }
          ]
        },
        {
          name: "Chest workout",
          exercises: [
            {
              name: "Leg curl",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            },
            {
              name: "Squats",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            }
          ]
        }
      ]
    },
    {
      name: "Day 2",
      workouts: [
        {
          name: "Back workout",
          exercises: [
            {
              name: "Leg curl",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            },
            {
              name: "Squats",
              primaryFocus: "leg",
              category: "strength",
              instructions: "",
              videoLink: "",
              files: []
            }
          ]
        }
      ]
    },
    { name: "Day 3", workouts: [] },
    { name: "Day 5", workouts: [] },
    { name: "Day 6", workouts: [] },
    { name: "Day 7", workouts: [] }
  ]);

  const removeDraggedWorkout = useCallback((prevDayIndex, prevWorkoutIndex) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[prevDayIndex].workouts.splice(prevWorkoutIndex, 1);
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

  const onDragEnter = useCallback((e, workout, index, dayIndex) => {
    e.preventDefault();

    const targetIndex = programDays[dayIndex]?.workouts.findIndex(
      workout => workout.name === draggedWorkout?.name
    );

    if (targetIndex !== -1) {
      const updatedArr = [...programDays];
      const workoutsArr = [...updatedArr[dayIndex]?.workouts];

      workoutsArr.splice(targetIndex, 1);
      workoutsArr.splice(index, 0, draggedWorkout);

      updatedArr[dayIndex].workouts = workoutsArr;
      setProgramDays(updatedArr);
    }
  }, [draggedWorkout, programDays]);

  const handleDrop = useCallback(
    (e, dayIndex) => {
      e.preventDefault();
      const draggedWorkoutData = JSON.parse(e.dataTransfer.getData("application/json"));

      if (draggedWorkoutData) {
        const { prevDayIndex, prevWorkoutIndex, workout } = draggedWorkoutData;
        removeDraggedWorkout(prevDayIndex, prevWorkoutIndex);
        addDroppedWorkout(dayIndex, workout);
      }      
    },
    [addDroppedWorkout, removeDraggedWorkout]
  );

  // Mapped workouts
  const MappedWorkouts = useMemo(
    () => ({ workouts, dayIndex }) => (
      <>
        {workouts.map((workout, index) => (
          <div 
            key={workout.name} 
            className="relative"
            onClick={() => setShowWorkoutDetailsModal(true)}
          >
            <div
              draggable
              onDragStart={e => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({ prevWorkoutIndex: index, prevDayIndex: dayIndex, workout })
                );
                setDraggedWorkout(workout);
              }}
              onDragEnter={e => onDragEnter(e, workout, index, dayIndex)}
              onDragEnd={(e) => setDraggedWorkout(null)}
              onDrop={e => {
                e.preventDefault();
                setDraggedWorkout(null)
              }}
              className="w-full rounded-lg mt-2 bg-indigo-100 p-3 cursor-pointer shadow-sm"
            >
              <h5 className="text-[14px] font-medium">{workout.name}</h5>
              <p className="text-[12px] mt-1 text-normal">{workout.exercises.length} exercises</p>
            </div>
          </div>
        ))}
      </>
    ),
    [programDays]
  );

  return (
    <>
      <Header pageTitle="Full Body Program" />
      <HeaderActions />
      <div className="flex gap-[10px]">
        {programDays.map((day, dayIndex) => (
          <div
            key={day.name}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, dayIndex)}
            className="h-[100vh] bg-white w-full p-2 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="uppercase text-[12px] text-gray-500 ml-1">{day.name}</p>
              <button 
                variant="outlined"
                className="h-[32px] flex items-center border-gray-200 border-solid border rounded-lg px-2"
                onClick={() => setShowAddWorkoutModal(true)}
              >
                <AddIcon className="w-3 h-3 mr-2" />
                <span className="text-[12px] text-gray-500">Add workout</span>
              </button>
            </div>
            <div className="mt-3">
              {day.workouts.length > 0 && (
                <MappedWorkouts workouts={day.workouts} dayIndex={dayIndex} />
              )}
            </div>
          </div>
        ))}
        {showAddWorkoutModal && (
          <SelectWorkoutModal
            onClose={() => setShowAddWorkoutModal(false)}
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