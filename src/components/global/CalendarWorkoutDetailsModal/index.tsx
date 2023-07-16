import { useEffect, useState } from "react";
import Modal from "@/components/global/Modal";
import { primaryTextColor } from "@/utils/themeColors";
import SelectedExercise from "./SelectedExercise";
import { ProgramExercise, ProgramSupersetExercise } from "@/utils/programTypes";
import VideoModal from "@/components/global/VideoModal";
import { useQuery } from "react-query";
import { getWorkout } from "@/api/Workout";
import { getProgramWorkout } from "@/api/Program";

export default function CalendarWorkoutDetailsModal({
  workoutId,
  setShowWorkoutDetailsModal,
  selectedCalendarType
}) {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");

  // get exercise data
  const { isLoading, data: workoutData, refetch } = useQuery('workout', () => {
    if (selectedCalendarType === "Program") {
      return getProgramWorkout(workoutId);
    } else {
      return getWorkout(workoutId);
    }
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Modal 
      onClose={() => setShowWorkoutDetailsModal?.(false)} 
      className="w-[600px] h-[90%]"
    >
      <div className="dark:bg-darkTheme-900 dark:border-b bg-[#10182a] p-7 dark:border-neutral-700">
        <div className="flex justify-between">
          <div>
            <p className={`text-neutral-200 text-[13px]`}>
              {workoutData?.dayName}
            </p>
            <h2 className="font-semibold text-white mt-1">
              {workoutData?.name}
            </h2>
          </div>
        </div>
        <p className={`text-neutral-200 text-[13px] w-[80%] font-light mt-3`}>
          {workoutData?.description}
        </p>
      </div>

      <div className="workout p-7">
        <p className={`${primaryTextColor} mb-5`}>
          {workoutData?.exercises?.length} Exercises
        </p>
        {workoutData?.exercises?.map((exercise: ProgramExercise) => {
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
              <div className="border-[2px] relative cursor-grab border-solid dark:border-blue-900 border-blue-500 rounded-lg overflow-hidden mb-5">
                <div className="bg-blue-100 dark:bg-blue-950 p-2">
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