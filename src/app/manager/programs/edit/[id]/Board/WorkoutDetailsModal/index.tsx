import { useState } from "react";
import Modal from "@/components/global/Modal";
import { primaryTextColor } from "@/utils/themeColors";
import SelectedExercise from "./SelectedExercise";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";
import VideoModal from "../../../../../../../components/global/VideoModal";
import { ProgramExercise, ProgramSupersetExercise, UseProgramWorkoutsContext } from "@/utils/programTypes";

export default function WorkoutDetailsModal() {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");
  
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

      <div className="workout p-7">
        <p className={`${primaryTextColor} mb-5`}>
          {currentWorkoutDetails.exercises?.length} Exercises
        </p>
        {currentWorkoutDetails.exercises.map((exercise: ProgramExercise) => {
          const { 
            name,
            instruction,
            primaryFocus,
            supersetExercises,
            sets,
            videoLink 
          } = exercise || {};

          if(supersetExercises?.length) {
            return (
              <div className="border-2 border-blue-900 rounded-lg overflow-hidden mb-5">
                <div className="bg-blue-900 p-2">
                  <p className="text-white">
                    Superset
                  </p>
                </div>
                {supersetExercises?.map((supersetExercise: ProgramSupersetExercise) => (
                  <SelectedExercise
                    name={supersetExercise?.name}
                    primaryFocus={supersetExercise?.primaryFocus}
                    instruction={supersetExercise?.instruction}
                    setShowVideoModal={setShowVideoModal}
                    setCurrentVideoLink={setCurrentVideoLink}
                    videoLink={supersetExercise?.videoLink}
                    sets={supersetExercise?.sets}
                  />
                ))}
              </div>
            );
          } else {
            return (
              <div className="mb-3">
                <SelectedExercise
                  name={name}
                  primaryFocus={primaryFocus}
                  instruction={instruction}
                  setShowVideoModal={setShowVideoModal}
                  setCurrentVideoLink={setCurrentVideoLink}
                  videoLink={videoLink}
                  sets={sets}
                />
              </div>
            );
          }
        })}
      </div>
      
      {showVideoModal && (
        <VideoModal
          videoUrl={currentVideoLink}
          handleClose={() => setShowVideoModal(false)}
        />
      )}
    </Modal>
  );
};