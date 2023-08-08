import Modal from "@/components/global/Modal";
import useProgramWorkouts from "@/store/Program/useProgramWorkouts";
import { UseProgramWorkoutsContext } from "@/utils/programTypes";
import SelectedExercisesList from "./SelectedExercisesList";

export default function WorkoutDetailsModal() {

  const {
    currentWorkoutDetails,
    setShowWorkoutDetailsModal
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  return (
    <Modal
      onClose={() => setShowWorkoutDetailsModal?.(false)} 
      className="w-[600px] h-[90%]"
    >
      <div className="dark:bg-darkTheme-900 dark:border-b bg-[#10182a] p-7 dark:border-neutral-700">
        <div className="flex justify-between">
          <div>
            <p className={`text-neutral-200 text-[13px]`}>
              {currentWorkoutDetails?.dayName}
            </p>
            <h2 className="font-semibold text-white mt-1">
              {currentWorkoutDetails?.name}
            </h2>
          </div>
        </div>
        <p className={`text-neutral-200 text-[13px] w-[80%] font-light mt-3`}>
          {currentWorkoutDetails.description}
        </p>
      </div>

      <SelectedExercisesList 
        currentWorkoutDetails={currentWorkoutDetails}
      />
    </Modal>
  );
};