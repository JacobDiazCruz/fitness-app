'use client'

// modals
import SelectWorkoutsModal from "./Workouts/SelectWorkoutsModal";

// child components
import DayContainer from "./Day/DayContainer";
import Draggable from "./Workouts/Draggable";

// context and hooks
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useProgram from "@/contexts/Program/useProgram";
import { UseProgramContext, UseProgramWorkoutsContext } from "@/utils/programTypes";
import WorkoutDetailsModal from "@/components/global/WorkoutDetailsModal";

export default function Board() {
  const {
    programDays
  }: UseProgramContext = useProgram()!;

  const {
    showAddWorkoutModal,
    setShowAddWorkoutModal,
    showWorkoutDetailsModal
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  return (
    <div className="program-board flex flex-col md:flex-row gap-[10px]">
      {programDays?.map((day: any, dayIndex: number) => (
        <DayContainer dayIndex={dayIndex}>
          <DayContainer.Header
            dayName={day.name}
            dayIndex={dayIndex}
            dayCount={day.dayCount}
          />
          {day?.workouts.map((workout: any, workoutIndex: number) => (
            <Draggable
              key={workoutIndex}
              workout={workout}
              workoutIndex={workoutIndex}
              dayIndex={dayIndex}
            >
              <Draggable.SelectedWorkout
                workout={workout}
                workoutIndex={workoutIndex}
                dayIndex={dayIndex}
                workoutsCount={day?.workouts?.length}
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
        />
      )}
    </div>
  );
};