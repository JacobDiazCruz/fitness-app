import { useState } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import Image from "next/image";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";
import { borderColor, primaryBgColor, primaryTextColor, tertiaryBgColor, secondaryTextColor } from "@/utils/themeColors";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import VideoThumbnail from "../../../../../components/global/VideoThumbnail";
import VideoModal from "../VideoModal";
import IconButton from "@/components/global/IconButton";
import SelectedExercise from "./SelectedExercise";

interface Props {
  workoutDay: number;
  workoutName: string;
  workoutDescription: string;
  exercises: Array<Exercise>;
  onClose: void;
};

export default function WorkoutDetailsModal({
  workoutDay,
  workoutName,
  workoutDescription,
  exercises,
  onClose
}: Props) {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[720px] h-[90%]">
      <div className="dark:bg-darkTheme-900 dark:border-b bg-[#10182a] p-7 dark:border-neutral-700">
        <div className="flex justify-between">
          <div>
            <p className={`text-neutral-200 text-[13px]`}>
              {workoutDay}
            </p>
            <h2 className="font-semibold text-white mt-1">
              {workoutName}
            </h2>
          </div>
        </div>
        <p className={`text-neutral-200 text-[13px] w-[80%] font-light mt-3`}>
          {workoutDescription}
        </p>
      </div>

      <div className="workout p-7">
        <p className={`${primaryTextColor} mb-5`}>
          {exercises?.length} Exercises
        </p>
        {exercises.map((exercise) => {
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
                {supersetExercises?.map((supersetExercise) => (
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