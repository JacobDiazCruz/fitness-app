import { useState } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import Image from "next/image";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";
import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

interface Props {
  workoutName: string;
  workoutDescription: string;
  exercises: Array<Exercise>;
  onClose: void;
};

const SelectedExercise = ({
  name,
  videoLink,
  primaryFocus,
  sets,
  setShowVideoModal,
  setCurrentVideoLink,
}: any) => {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  return (
    <div className={`${borderColor} border shadow-sm border-solid mb-3 rounded-lg overflow-hidden`}>
      <div className="py-2 px-4 h-[55px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center">
          {videoLink && (
            <div 
              onClick={() => {
                setShowVideoModal(true)
                setCurrentVideoLink(videoLink)
              }}
              className="w-[42px] h-[33px] relative overflow-hidden rounded-md cursor-pointer"
            >
              <VideoThumbnail
                videoUrl={videoLink}
              />
            </div>
          )}
          <p className={`${primaryTextColor} text-[14px]`}>
            {name}
          </p>
          <div className={`${handlePrimaryFocusColor(primaryFocus)} rounded-md text-center px-2 text-[12px]`}>
            Core
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
  );
}

export default function WorkoutDetailsModal({
  workoutName,
  workoutDescription,
  exercises,
  onClose
}: Props) {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoLink, setCurrentVideoLink] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[500px] h-[90%]">
      <div className="bg-[#10182a] p-7">
        <div className="flex justify-between">
          <h2 className="font-semibold text-white">{workoutName}</h2>
          <button onClick={onClose}>
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-[13px] text-gray-50 w-[80%] font-light mt-3">
          {workoutDescription}
        </p>
      </div>

      <div className="workout p-7">
        {exercises.map((exercise) => {
          const { name, primaryFocus, sets, videoLink } = exercise;
          return (
            <SelectedExercise 
              name={name} 
              primaryFocus={primaryFocus}
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