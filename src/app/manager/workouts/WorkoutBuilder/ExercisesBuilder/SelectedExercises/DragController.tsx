import React, { useEffect, useRef } from "react";
import useExercisesDragController from "@/hooks/workouts/useExercisesDragController";
import { IExercise } from "@/types/exercise";

interface DragControllerProps {
  exercise: IExercise;
  exerciseIndex: number;
  children: React.ReactNode;
  draggedExercise: IExercise | null;
  exerciseType?: 'superset' | 'normal';
  handleDraggedExercise: (val: any) => void;
}

export default function DragController({
  exercise,
  exerciseIndex,
  children,
  exerciseType,
  draggedExercise,
  handleDraggedExercise
}: DragControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const {
    handleSupersetDragEnter,
    handleDragEnter
  } = useExercisesDragController();

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
          handleDraggedExercise(exercise);
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleDraggedExercise(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          handleDraggedExercise(null);
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