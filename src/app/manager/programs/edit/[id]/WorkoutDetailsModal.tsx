import { useState } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import Image from "next/image";
import Button from "@/components/global/Button";
import { Exercise } from "@/utils/types";

interface Props {
  workoutName: string;
  workoutDescription: string;
  exercises: Array<Exercise>;
  onClose: void;
};

export default function WorkoutDetailsModal({
  workoutName,
  workoutDescription,
  exercises,
  onClose
}: Props) {
  const SelectedExercise = ({ exercise }) => {
    return (
      <div className="border shadow-sm border-solid border-gray-200 mb-3 rounded-lg overflow-hidden">
        <div className="py-2 px-4 bg-gray-100 h-[55px] flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <div className="w-[42px] h-[33px] relative overflow-hidden rounded-md">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <p className="text-[14px]">{exercise.name}</p>
            <div className="rounded-md text-center bg-[#DAF6E0] text-[#015212] px-2 text-[12px]">
              Core
            </div>
          </div>
          <button>
            {/* {trashIcon} */}
          </button>
        </div>
        <div className="bg-white p-6 text-center text-[12px]">
          <div className="flex gap-[15px]">
            <div className="field w-[100px]">
              <p className="mb-2 text-gray-500">Set</p>
              <p className="font-light">1</p>
              <p className="font-light">2</p>
            </div>
            <div className="field w-[100px]">
              <p className="mb-2 text-gray-500">Reps</p>
              <p className="font-light">5</p>
              <p className="font-light">3</p>
            </div>
            <div className="field w-[100px]">
              <p className="mb-2 text-gray-500">Time</p>
              <p className="font-light">--</p>
              <p className="font-light">--</p>
            </div>
            <div className="field w-[100px]">
              <p className="mb-2 text-gray-500">Rest</p>
              <p className="font-light">00:00</p>
              <p className="font-light">00:00</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        {exercises.map((exercise) => (
          <SelectedExercise exercise={exercise} />
        ))}
      </div>
    </Modal>
  );
}