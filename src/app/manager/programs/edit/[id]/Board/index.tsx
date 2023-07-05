'use client'

import { useState } from "react";
import SelectWorkoutModal from "./SelectWorkoutModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";

// child components
import DayWrapper from "./DayWrapper";
import Draggable from "./Draggable";

// context and hooks
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useProgram from "@/contexts/Program/useProgram";
import useDraggableWorkout from "@/contexts/Program/useDraggableWorkout";
import { UseDraggableWorkoutContext, UseProgramContext, UseProgramWorkoutsContext } from "@/utils/programTypes";

export default function Board() {
  const {
    programName,
    programDescription,
    weeks,
    programDays,
    setProgramDays,
    handleEditProgramMutation
  }: UseProgramContext = useProgram()!;

  const {
    showAddWorkoutModal,
    setShowAddWorkoutModal,
    showWorkoutDetailsModal,
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const {
    onDropWorkout
  }: UseDraggableWorkoutContext = useDraggableWorkout()!;

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Array<any>>([]);

  return (
    <div className="program-board flex flex-col md:flex-row gap-[10px]">
      {programDays?.map((day: any, dayIndex: number) => (
        <DayWrapper
          dayName={day.name}
          dayIndex={dayIndex}
          handleDrop={onDropWorkout}
          setSelectedDayIndex={setSelectedDayIndex}
          handleEditProgramMutation={handleEditProgramMutation}
        >
          {day.workouts.map((workout: any, workoutIndex: number) => (
            <Draggable
              key={workout.secondaryId}
              workout={workout}
              workoutIndex={workoutIndex}
              dayIndex={dayIndex}
            >
              <Draggable.Workout
                workout={workout}
                workoutIndex={workoutIndex}
                dayIndex={dayIndex}
              />
            </Draggable>
          ))}
        </DayWrapper>
      ))}

      {/* Modals */}
      {showWorkoutDetailsModal && (
        <WorkoutDetailsModal />
      )}
      {showAddWorkoutModal && (
        <SelectWorkoutModal
          onClose={() => setShowAddWorkoutModal?.(false)}
          setSelectedWorkouts={setSelectedWorkouts}
          setProgramDays={setProgramDays}
          programName={programName}
          programDescription={programDescription}
          selectedDayIndex={selectedDayIndex}
          weeks={weeks}
        />
      )}
    </div>
  );
};