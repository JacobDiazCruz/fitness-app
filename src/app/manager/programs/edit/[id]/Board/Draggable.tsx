import React, { ReactNode } from "react";
import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import { UseDraggableWorkoutContext, UseProgramWorkoutsContext } from "@/utils/programTypes";
import SelectedWorkout from "./SelectedWorkout";

interface Props {
  workout: any;
  workoutIndex: number;
  dayIndex: number;
  children: ReactNode;
};

export default function Draggable({
  workout,
  workoutIndex,
  dayIndex,
  children
}: Props) {
  const {
    draggedWorkout,
    setDraggedWorkout,
    onDragEnter
  }: UseDraggableWorkoutContext = useDraggableWorkout()!;

  const {
    handleClickWorkout
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  return (
    <div
      className="relative"
      onClick={() => handleClickWorkout?.(workout, dayIndex)}
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
              prevWorkoutIndex: workoutIndex,
              prevDayIndex: dayIndex,
              workout
            })
          );
          setDraggedWorkout?.(workout);
        }}
        onDragEnter={e => {
          onDragEnter(e, workoutIndex, dayIndex)
        }}
        onDrop={e => {
          e.preventDefault();
          setDraggedWorkout?.(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          setDraggedWorkout?.(null)
        }}
        className="w-full bg-white dark:bg-darkTheme-800 rounded-lg mt-2 p-3 cursor-pointer shadow-md"
        style={{
          opacity: draggedWorkout === workout ? "0.01" : "1"
        }}
      >
        {children}
      </div>
    </div>
  );
};

Draggable.Workout = SelectedWorkout;