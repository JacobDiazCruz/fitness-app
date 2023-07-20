import { ProgramExercise, ProgramSupersetExercise } from "@/utils/programTypes";
import { primaryTextColor } from "@/utils/themeColors";
import { useState } from "react";
import VideoModal from "../VideoModal";
import SelectedExercise from "./SelectedExercise";

interface Props {
  currentWorkoutDetails: any;
};

export default function SelectedExercisesList({
  currentWorkoutDetails
}: Props) {

  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");

  return (
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

      {showVideoModal && (
        <VideoModal
          videoUrl={currentVideoLink}
          handleClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
};