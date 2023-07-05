import ItemActionsMenu from "@/components/global/ItemActionsMenu";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import PermissionAccess from "@/components/global/PermissionAccess";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import { UseProgramWorkoutsContext } from "@/utils/programTypes";

interface Props {
  workout: any;
  workoutIndex: number;
  dayIndex: number;
};

export default function SelectedWorkout ({
  workout,
  workoutIndex,
  dayIndex
}: Props) {

  const {
    handleDeleteWorkout,
    handleEditWorkout
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

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
            handleEditWorkout?.({
              workoutId: workout._id,
              workoutSecondaryId: workout?.secondaryId,
              workoutIndex,
              dayIndex
            });
          }}
          handleDelete={() => {
            handleDeleteWorkout?.(workout, dayIndex);
          }}
        />
      </PermissionAccess>
    </div>
  );
}