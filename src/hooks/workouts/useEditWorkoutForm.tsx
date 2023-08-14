import { editProgramWorkout } from "@/api/Program";
import { editWorkout } from "@/api/Workout";
import useAlert from "@/store/Alert";
import useWorkout from "@/store/Workout/useWorkout";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "react-query";

export default function useEditWorkoutForm() {
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();
  const editProgram = searchParams.get("editProgram");
  const { dispatchAlert }: any = useAlert();

  const { state } = useWorkout();
  const { selectedExercises } = state;

  const editWorkoutMutation = useMutation(editWorkout, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Workout edited successfully"
      });
      router.push('/manager/workouts');
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editProgramWorkoutMutation = useMutation(editProgramWorkout, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Program's workout edited successfully"
      });
      router.back();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  /**
   * @purpose This function handles edit workout from workouts page, and edit workout from programs
   * @note 
   */
   const handleSubmit = (
    workoutName: string,
    workoutDescription: string,
    workoutData: any
  ) => {
    if(!editProgram) {
      editWorkoutMutation.mutateAsync({
        id: params.id,
        data: {
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        }
      });
    } else {
      const { _id, ...existingWorkoutData } = workoutData;

      editProgramWorkoutMutation.mutateAsync({
        id: params.id,
        data: {
          ...existingWorkoutData,
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises
        }
      });
    }
  };

  return {
    editWorkoutMutation,
    handleSubmit
  }
};