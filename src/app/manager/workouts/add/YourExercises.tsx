import { useEffect, useState } from "react";
import TextField from "@/components/global/TextField";
import Image from "next/image";
import { Exercise } from "@/utils/types"

export const EXERCISES_LIST: Array[Exercise] = [
  {
    _id: "214124",
    name: "Medicine ball Full Twist",
    primaryFocus: "Core",
    category: "Strength"
  },
  {
    _id: "424242",
    name: "Incline dumbbell press",
    primaryFocus: "Upper Chest",
    category: "strength"
  },
  {
    _id: "62362",
    name: "Barbell Press",
    primaryFocus: "Core",
    category: "Strength"
  },
  {
    _id: "124643",
    name: "Leg curls",
    primaryFocus: "Upper Chest",
    category: "strength"
  },
  {
    _id: "111212",
    name: "Medicine ball Full Twist",
    primaryFocus: "Core",
    category: "Strength"
  },
  {
    _id: "745212",
    name: "Incline dumbbell press",
    primaryFocus: "Upper Chest",
    category: "strength"
  }
];

export default function YourExercises({}) {
  const [searchExercise, setSearchExercise] = useState<string>("");
  const [exercisesList, setExercisesList] = useState<Array[Exercise]>([]);

  useEffect(() => {
    const filteredExercise = EXERCISES_LIST.filter((exercise: Exercise) => {
      if(exercise.name.toLowerCase().includes(searchExercise.toLowerCase())) {
        return exercise
      }
    });
    setExercisesList(filteredExercise);
  }, [searchExercise]);

  const onDragStart = (e, exercise) => {
    e.dataTransfer.setData("exercise", JSON.stringify(exercise))
  }

  const DraggableExerciseItem = ({ exercise }: Exercise) => {
    return (
      <div
        onDragStart={(e) => onDragStart(e, exercise)}
        draggable
        className="cursor-grab hover:bg-gray-100 flex items-center rounded-lg mb-3 gap-[10px] h-[83px] border border-solid border-gray-300"
      >
        <div className="bg-gray-200 flex items-center w-[40%] h-full overflow-hidden relative">
          <Image
            alt="Exercise"
            src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            width={200}
            height={200}
          />
        </div>
        <div className="pr-3 w-[60%]">
          <p className="text-[14px]">{exercise.name}</p>
          <div className="flex">
            <div className="rounded-md mt-1 text-center bg-[#DAF6E0] text-[#015212] px-2 text-[11px] h-[16px]">
              {exercise.primaryFocus}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-[18px] font-medium">Your Exercises</h2>
      <TextField
        startIcon={<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
        placeholder="Search exercise"
        className="mt-5"
        value={searchExercise}
        onChange={(e) => setSearchExercise(e.target.value)}
      />
      <div className="exercises-list overflow-scroll overflow-x-hidden h-[61vh] mt-5">
        {exercisesList.map((exercise: Exercise) => (
          <DraggableExerciseItem exercise={exercise} />
        ))}
      </div>
    </>
  );
}