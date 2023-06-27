import { useState } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import Image from "next/image";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";
import { borderColor, primaryBgColor, primaryTextColor, tertiaryBgColor, secondaryTextColor } from "@/utils/themeColors";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";
import IconButton from "@/components/global/IconButton";

interface Props {
  workoutDay: number;
  workoutName: string;
  workoutDescription: string;
  exercises: Array<Exercise>;
  onClose: void;
};

const SelectedExercise = ({
  name,
  instruction,
  videoLink,
  primaryFocus,
  sets,
  setShowVideoModal,
  setCurrentVideoLink,
}: any) => {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  return (
    // Video
    <div className="flex gap-[15px]">
      {videoLink && (
        <div 
          className="w-[150px] relative overflow-hidden rounded-md"
        >
          <VideoThumbnail
            videoUrl={videoLink}
            onClick={() => {
              setShowVideoModal(true)
              setCurrentVideoLink(videoLink)
            }}
          />
        </div>
      )}
      <div className={`${borderColor} border shadow-sm border-solid mb-3 rounded-lg overflow-hidden`}>
        {/* Header */}
        <div className={`${tertiaryBgColor} py-2 px-4 flex justify-between items-center`}>
          <div className="flex gap-[10px] items-center">
            <div className="w-[50%]">
              <p className={`${primaryTextColor} text-[14px] font-semibold`}>
                {name}
              </p>
              <p className={`${secondaryTextColor} text-[12px] font-light mt-2`}>
                {instruction}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className={`${handlePrimaryFocusColor(primaryFocus)} rounded-md text-center px-2 text-[11px] whitespace-nowrap`}>
              {primaryFocus}
            </div>
          </div>
        </div>
        <div className={`${primaryBgColor} p-6 text-center text-[13px]`}>
          <div className="headers flex gap-[15px]">
            <div className="field w-[100px] flex">
              <p className={`${secondaryTextColor} font-light`}>
                Set
              </p>
            </div>
            <div className="field w-[100px] flex">
              <p className={`${secondaryTextColor} font-light`}>
                Set type
              </p>
            </div>
            <div className="field w-[100px] flex">
              <p className={`${secondaryTextColor} font-light`}>
                Reps
              </p>
            </div>
            <div className="field w-[100px] flex">
              <p className={`${secondaryTextColor} font-light`}>
                Rest
              </p>
            </div>
          </div>
          <div className="mt-4">
            {sets?.map((set: any, index: number) => {
              const { setType, reps, rest } = set;
              return (
                <div className="flex gap-[15px] mt-2">
                  <div className="field w-[100px] flex">
                    <p className={`${primaryTextColor} font-light`}>
                      {index + 1}
                    </p>
                  </div>
                  <div className="field w-[100px] flex">
                    <p className={`${primaryTextColor} font-light`}>
                      {setType?.name || '--'}
                    </p>
                  </div>
                  <div className="field w-[100px] flex">
                    <p className={`${primaryTextColor} font-light`}>
                      {reps || '--'}
                    </p>
                  </div>
                  <div className="field w-[100px] flex">
                    <p className={`${primaryTextColor} font-light`}>
                      {rest || '--'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="dark:bg-indigo-950 dark:border-b bg-[#10182a] p-7 dark:border-indigo-900">
        <div className="flex justify-between">
          <div>
            <p className={`text-neutral-200 text-[13px]`}>
              {workoutDay}
            </p>
            <h2 className="font-semibold text-white mt-1">
              {workoutName}
            </h2>
          </div>
          <button onClick={onClose} className="p-1">
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
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
          const { name, instruction, primaryFocus, sets, videoLink } = exercise;
          return (
            <SelectedExercise 
              name={name} 
              primaryFocus={primaryFocus}
              instruction={instruction}
              setShowVideoModal={setShowVideoModal}
              setCurrentVideoLink={setCurrentVideoLink}
              videoLink={videoLink}
              sets={sets} 
            />
          );
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
}