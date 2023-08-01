import Button from "@/components/global/Button";
import { DumbbellIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout/useWorkout";
import { WorkoutContext } from "@/utils/workoutTypes";
import { useState } from "react";
import SelectExercisesModal from "./SelectExercisesModal";

export default function ExercisesMobileSelection() {
  const {
    setSelectedExercises
  }: WorkoutContext = useWorkout()!;

  const [showYourExercises, setShowYourExercises] = useState<boolean>(false);

  return (
    <>
      <Button
        className="w-full mt-8 block md:hidden bg-blue-950 text-blue-500 font-semibold"
        onClick={() => setShowYourExercises(true)}
        startIcon={<DumbbellIcon className="w-5 h-5 fill-[#3B82F6]" />}
      >
        Select Exercise
      </Button>

      {/* @note: For mobile view only */}
      {showYourExercises && (
        <SelectExercisesModal
          onClose={() => setShowYourExercises(false)}
          setSelectedExercises={setSelectedExercises}
        />
      )}
    </>
  );
}