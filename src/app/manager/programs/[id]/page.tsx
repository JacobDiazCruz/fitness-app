'use client'

import { useCallback, useState, useMemo } from "react";
import Header from "@/components/manager/Header";

export default function EditProgram() {
  const [draggedWorkout, setDraggedWorkout] = useState(null);
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

  const MappedWorkouts = useMemo(
    () => ({ workouts, dayIndex }) => (
      <>
        {workouts.map((workout, index) => (
          <div key={workout.name} className="relative">
            {/* {draggedWorkout?.name}
            <div 
              className="bg-gray-200 w-full h-[70px] absolute rounded-lg"
              style={{
                visibility: draggedWorkout === workout ? 'visible' : 'hidden'
              }}
            ></div> */}
            <div
              draggable
              style={{
                opacity: draggedWorkout === workout ? 0.01 : 1
              }}
              onDragStart={e => {
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({ prevWorkoutIndex: index, prevDayIndex: dayIndex, workout })
                );
                setDraggedWorkout(workout);
              }}
              onDragEnter={e => onDragEnter(e, workout, index, dayIndex)}
              onDragEnd={(e) => setDraggedWorkout(null)}
              onDrop={e => setDraggedWorkout(null)}
              className="w-full rounded-lg mt-2 bg-gray-200 p-3"
            >
              <h5 className="text-[14px] font-medium">{workout.name}</h5>
              <p className="text-[12px] mt-1 text-normal">{workout.exercises.length} exercises</p>
            </div>
          </div>
        ))}
      </>
    ),
    [programDays, setProgramDays, setDraggedWorkout]
  );

  return (
    <>
      <Header pageTitle="Full Body Program" />
      <div className="flex gap-[10px]">
        {programDays.map((day, dayIndex) => (
          <div
            key={day.name}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, dayIndex)}
            className="h-[100vh] bg-white w-full p-2"
          >
            <p className="uppercase text-[12px] text-gray-500">{day.name}</p>
            {day.workouts.length > 0 && (
              <MappedWorkouts workouts={day.workouts} dayIndex={dayIndex} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
