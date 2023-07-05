import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";
import useProgram from "@/contexts/Program/useProgram";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import React, { ReactNode, useCallback, useState } from "react";

export default function DraggableWorkout({
  workouts,
  dayIndex,
  dayName,
  children
}: {
  workouts: Array<any>;
  dayIndex: number;
  dayName: string;
  children: ReactNode;
}) {
  const {
    programDays,
    setProgramDays
  } = useProgram();

  const {
    draggedWorkout,
    setDraggedWorkout,
    onDragEnter
  } = useDraggableWorkout();

  const {
    handleClickWorkout,
  } = useProgramWorkouts();

  return (
    <>
      {workouts.map((workout, index) => (
        <div
          key={workout.secondaryId}
          className="relative"
          onClick={() => handleClickWorkout(workout, dayName)}
        >
          <div
            className="dark:bg-darkTheme-900 bg-gray-300 w-full rounded-lg h-[60px] absolute mt-2"
            style={{
              display: draggedWorkout === workout ? "block" : "none"
            }}
          />
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
            className="w-full bg-white dark:bg-darkTheme-800 rounded-lg mt-2 p-3 cursor-pointer shadow-md"
            style={{
              opacity: draggedWorkout === workout ? "0.01" : "1"
            }}
          >
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                workout,
                workoutIndex: index,
                dayIndex
              });
            })}
          </div>
        </div>
      ))}
    </>
  );
}