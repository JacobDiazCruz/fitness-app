'use client'

// modals
import SelectWorkoutsModal from "./Workouts/SelectWorkoutsModal";
import WorkoutDetailsModal from "./Workouts/WorkoutDetailsModal";

// child components
import DayContainer from "./Day/DayContainer";
import Draggable from "./Workouts/Draggable";

// context and hooks
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useProgram from "@/contexts/Program/useProgram";
import { UseProgramContext, UseProgramWorkoutsContext } from "@/utils/programTypes";
import { useState } from "react";

export default function Board() {
  const {
    programDays
  }: UseProgramContext = useProgram()!;

  const {
    showAddWorkoutModal,
    setShowAddWorkoutModal,
    showWorkoutDetailsModal
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const [_, setSelectedWorkouts] = useState<Array<any>>([]);

  return (
    <div className="program-board flex flex-col md:flex-row gap-[10px]">
      {programDays?.map((day: any, dayIndex: number) => (
        <DayContainer dayIndex={dayIndex}>
          <DayContainer.Header
            dayName={day.name}
            dayIndex={dayIndex}
          />
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
        </DayContainer>
      ))}

      {/* Modals */}
      {showWorkoutDetailsModal && (
        <WorkoutDetailsModal />
      )}
      {showAddWorkoutModal && (
        <SelectWorkoutsModal
          onClose={() => setShowAddWorkoutModal?.(false)}
          setSelectedWorkouts={setSelectedWorkouts}
        />
      )}
    </div>
  );
};