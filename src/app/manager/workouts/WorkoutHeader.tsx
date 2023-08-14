import useEditWorkoutForm from "@/hooks/workouts/useEditWorkoutForm";
import Header from "../Header";

export default function WorkoutHeader({
  workoutName,
  workoutDescription,
  workoutData
}: any) {
  const {
    handleSubmit,
    editWorkoutMutation
  } = useEditWorkoutForm();

  return (
    <Header
      pageTitle="Edit Workout"
      backIcon
      showActionButtons
      isLoading={editWorkoutMutation.isLoading}
      handleSubmit={() => handleSubmit(workoutName, workoutDescription, workoutData)}
    />
  );
}