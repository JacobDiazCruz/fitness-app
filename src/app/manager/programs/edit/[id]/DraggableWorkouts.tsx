import { useState } from "react";
import ItemActionsMenu from "@/components/global/ItemActionsMenu";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { Exercise } from "@/utils/types";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import PermissionAccess from "@/components/global/PermissionAccess";

interface CurrentWorkoutDetails {
  name: string;
  description: string;
  exercises: Array<Exercise>;
};

export default function DraggableWorkouts ({ 
  workouts, 
  dayIndex,
  dayName,
  draggedWorkout,
  setDraggedWorkout,
  handleMutateProgram,
  programDays,
  setProgramDays
}: any) {
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [currentWorkoutDetails, setCurrentWorkoutDetails] = useState<CurrentWorkoutDetails>({
    name: "",
    description: "",
    exercises: []
  });

  const onDragEnter = ((e, workout, index, dayIndex) => {
    e.preventDefault();

    const targetIndex = programDays[dayIndex]?.workouts.findIndex(
      workout => workout.secondaryId === draggedWorkout?.secondaryId
    );

    if (targetIndex !== -1) {
      const updatedArr = [...programDays];
      const workoutsArr = [...updatedArr[dayIndex]?.workouts];
  
      workoutsArr.splice(targetIndex, 1);
      workoutsArr.splice(index, 0, draggedWorkout);

      updatedArr[dayIndex].workouts = workoutsArr;
      setProgramDays(updatedArr);
    }
  });

  const handleDelete = (workout) => {
    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      const prevWorkoutIndex = programDays[dayIndex]?.workouts.findIndex(
        wk => wk.secondaryId === workout?.secondaryId
      );
      cloneProgramDays[dayIndex].workouts.splice(prevWorkoutIndex, 1);
      return cloneProgramDays;
    });

    handleMutateProgram();
  }

  const handleClickWorkout = (workout) => {
    const { name, description, exercises } = workout
    setCurrentWorkoutDetails({
      name,
      description,
      exercises
    })
    setShowWorkoutDetailsModal(true);
  }

  return (
    <>
      {workouts.map((workout, index) => (
        <div
          key={workout.secondaryId}
          className="relative"
          onClick={() => handleClickWorkout(workout)}
        >
          <div
            className="dark:bg-neutral-900 bg-gray-300 w-full rounded-lg h-[60px] absolute mt-2"
            style={{
              display: draggedWorkout === workout ? "block" : "none"
            }}
          ></div>
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
            className="w-full flex justify-between bg-white dark:bg-neutral-800 rounded-lg mt-2 p-3 cursor-pointer shadow-md"
            style={{
              opacity: draggedWorkout === workout ? "0.01" : "1"
            }}
          >
            <div>
              <h5 className={`${primaryTextColor} text-[14px] font-medium`}>
                {workout.name}
              </h5>
              <p className={`${secondaryTextColor} text-[12px] mt-1 text-normal`}>
                {workout.exercises.length} exercises
              </p>
            </div>
            <PermissionAccess roleAccess="Coach">
              <ItemActionsMenu
                editPath={`/manager/workouts/edit/${workout._id}`}
                handleDelete={() => handleDelete(workout)}
              />
            </PermissionAccess>
          </div>
        </div>
      ))}

      {showWorkoutDetailsModal && (
        <WorkoutDetailsModal
          workoutName={currentWorkoutDetails.name}
          workoutDescription={currentWorkoutDetails.description}
          workoutDay={dayName}
          exercises={currentWorkoutDetails.exercises}
          onClose={() => setShowWorkoutDetailsModal(false)}
        />
      )}
    </>
  )
};