import { useContext, useState } from "react";
import ItemActionsMenu from "@/components/global/ItemActionsMenu";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { Exercise } from "@/utils/types";
import WorkoutDetailsModal from "../WorkoutDetailsModal";
import PermissionAccess from "@/components/global/PermissionAccess";
import { Router } from "next/router";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import useDraggableWorkout from "@/app/manager/programs/edit/[id]/Board/DraggableWorkout";

export default function SelectedWorkout ({
  workout,
  workoutIndex,
  dayIndex
}: any) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const {
    showWorkoutDetailsModal,
    currentWorkoutDetails,
    setShowWorkoutDetailsModal,
    setCurrentWorkoutDetails,
    handleDeleteWorkout,
    handleClickWorkout,
    handleEditWorkout
  } = useProgramWorkouts();

  return (
    <div className="flex justify-between">
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
          handleEdit={() => {
            handleEditWorkout({
              workoutId: workout._id,
              workoutSecondaryId: workout.secondaryId,
              workoutIndex,
              dayIndex
            });
          }}
          handleDelete={() => {
            handleDeleteWorkout(workout, dayIndex);
          }}
        />
      </PermissionAccess>
    </div>
  );
}