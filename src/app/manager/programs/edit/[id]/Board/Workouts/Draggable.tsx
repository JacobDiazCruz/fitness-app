import React, { ReactNode, useEffect, useRef } from "react";
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
    handleDropWorkoutReposition,
    onDragEnter
  }: UseDraggableWorkoutContext = useDraggableWorkout()!;

  const {
    handleClickWorkout
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && placeholderRef.current) {
      placeholderRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [children]);

  const DropPlaceholder = () => {
    return (
      <div
        ref={placeholderRef}
        className="dark:bg-darkTheme-900 bg-gray-300 w-full rounded-lg absolute mb-2"
        style={{
          display: draggedWorkout === workout ? "block" : "none"
        }}
      />
    );
  };

  return (
    <div
      className="draggable-workout relative"
      onClick={() => handleClickWorkout?.(workout, dayIndex)}
    >
      <DropPlaceholder />
      <div
        ref={containerRef}
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
        onDrop={e => {
          e.preventDefault();
          handleDropWorkoutReposition();
          setDraggedWorkout?.(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          setDraggedWorkout?.(null);
        }}
        className="w-full bg-white dark:bg-darkTheme-800 rounded-lg mt-2 p-3 cursor-pointer shadow-md"
        style={{
          opacity: draggedWorkout === workout ? 0.001 : 1
        }}
      >
        <div
          className="droppable absolute z-[40] w-full bg-transparent w-full h-[60px] rounded-lg"
          style={{
            visibility: draggedWorkout ? "visible" : "hidden"
          }}
          onDragEnter={e => {
            onDragEnter(e, workoutIndex, dayIndex)
          }}
        ></div>
        <div className="z-[30]">{children}</div>
      </div>
    </div>
  );
};

Draggable.SelectedWorkout = SelectedWorkout;