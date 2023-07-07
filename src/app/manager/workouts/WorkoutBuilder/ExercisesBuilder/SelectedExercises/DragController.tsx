import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";
import { Exercise } from "@/utils/types";

interface DragControllerProps {
  exercise: Exercise;
  exerciseIndex: number;
  children: React.ReactNode;
  draggedExercise: Exercise | null;
  setDraggedExercise: Dispatch<SetStateAction<Exercise | null>>;
}

export default function DragController({
  exercise,
  exerciseIndex,
  children,
  draggedExercise,
  setDraggedExercise
}: DragControllerProps) {

  const {
    handleDragEnter
  }: any = useExercisesDragController();

  return (
    <div className="draggable relative">
      <div
        className="dragging-placeholder w-full dark:bg-darkTheme-950 bg-neutral-200 w-full h-[180px] absolute rounded-lg"
        style={{
          display: draggedExercise === exercise ? "block" : "none"
        }}
      ></div>
      <div
        draggable
        onDragStart={() => {
          setDraggedExercise(exercise);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDraggedExercise(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          setDraggedExercise(null);
        }}
        className="cursor-grab mt-4"
        style={{
          opacity: draggedExercise === exercise ? 0.01 : 1
        }}
      >
        <div 
          className="droppable absolute z-[40] w-full bg-transparent w-full h-[180px] rounded-lg"
          style={{
            visibility: draggedExercise ? "visible" : "hidden" 
          }}
          onDragEnter={(e) => {
            handleDragEnter(e, exerciseIndex, draggedExercise)
          }}
        ></div>
        <div className="z-[30]">
          {children}
        </div>
      </div>
    </div>
  );
}
