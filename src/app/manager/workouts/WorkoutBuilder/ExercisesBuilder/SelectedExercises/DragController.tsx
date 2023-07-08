import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";
import { Exercise } from "@/utils/types";

interface DragControllerProps {
  exercise: Exercise;
  exerciseIndex: number;
  children: React.ReactNode;
  draggedExercise: Exercise | null;
  exerciseType?: 'superset' | 'normal';
  setDraggedExercise: Dispatch<SetStateAction<Exercise | null>>;
}

export default function DragController({
  exercise,
  exerciseIndex,
  children,
  exerciseType,
  draggedExercise,
  setDraggedExercise
}: DragControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const {
    handleSupersetDragEnter,
    handleDragEnter
  }: any = useExercisesDragController();

  useEffect(() => {
    if (containerRef.current && placeholderRef.current) {
      placeholderRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [children]);

  const DropPlaceholder = () => {
    return (
      <div
        className="drop-placeholder w-full dark:bg-darkTheme-950 bg-neutral-200 w-full absolute rounded-lg"
        style={{
          display: draggedExercise === exercise ? "block" : "none"
        }}
        ref={placeholderRef}
      ></div>
    );
  };

  return (
    <div className="draggable relative">
      <DropPlaceholder />
      <div
        ref={containerRef}
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
          opacity: draggedExercise === exercise ? 0.001 : 1
        }}
      >
        <div
          className="droppable absolute z-[40] w-full bg-transparent w-full h-[180px] rounded-lg"
          style={{
            visibility: draggedExercise ? "visible" : "hidden"
          }}
          onDragEnter={(e) => {
            if(exerciseType === "superset") {
              handleSupersetDragEnter(e, exerciseIndex, draggedExercise);
            } else {
              handleDragEnter(e, exerciseIndex, draggedExercise);
            }
          }}
        ></div>
        <div className="z-[30]">{children}</div>
      </div>
    </div>
  );
}
