import ItemActionsMenu from "@/components/global/ItemActionsMenu";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import PermissionAccess from "@/components/global/PermissionAccess";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import { UseProgramWorkoutsContext } from "@/utils/programTypes";
import { useMutation } from "react-query";
import { addProgramWorkouts } from "@/api/Program";
import useProgram from "@/contexts/Program/useProgram";

interface Props {
  workout: any;
  workoutIndex: number;
  dayIndex: number;
  workoutsCount: number;
};

export default function SelectedWorkout ({
  workout,
  workoutIndex,
  workoutsCount = 0,
  dayIndex
}: Props) {

  const {
    handleDeleteWorkout,
    handleEditWorkout
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const {
    weeks,
    setProgramDays,
    handleEditProgramMutation
  }: any = useProgram();

  const addProgramWorkoutsMutation = useMutation(addProgramWorkouts, {
    onSuccess: async (data) => {
      if(data) {
        return data;
      }
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const duplicateWorkout = async () => {
    const addResult = await addProgramWorkoutsMutation.mutateAsync({
      workouts: [{
        ...workout,
        programDetails: {
          ...workout.programDetails,
          positionIndex: workoutsCount + 1
        }
      }]
    });
    
    setProgramDays((prevProgramDays: any) => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[dayIndex ?? 0].workouts = [
        ...cloneProgramDays[dayIndex ?? 0].workouts,
        ...addResult.data.data
      ];
      return cloneProgramDays;
    });

    handleEditProgramMutation(weeks);
  }

  return (
    <div className="flex justify-between">
      <div>
        <h5 className={`${primaryTextColor} text-[14px] font-medium`}>
          {workout?.name}
        </h5>
        <p className={`${secondaryTextColor} text-[12px] mt-1 text-normal`}>
          {workout?.exercises?.length} exercises
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
          handleDuplicate={() => duplicateWorkout()}
        />
      </PermissionAccess>
    </div>
  );
};