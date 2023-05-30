import { useState } from "react";
import TextField from "@/components/global/TextField";
import Image from "next/image";

export default function YourExercises() {
  const [exercisesList, setExercisesList] = useState<Array>([
    {
      name: "Medicine ball Full Twist",
      primaryFocus: "Core",
      category: "Strength"
    },
    {
      name: "Incline dumbbell press",
      primaryFocus: "Upper Chest",
      category: "strength"
    }
  ]);

  return (
    <div>
      <h2>Your Exercises</h2>
      <TextField 
        startIcon={<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
        placeholder="Search exercise"
        className="mt-5"
      />
      <div className="exercises-list mt-5">
        {exercisesList.map((exercise) => (
          <div className="flex items-center rounded-lg mb-3 gap-[10px] h-[83px] border border-solid border-gray-300">
            <div className="bg-gray-300 w-[120px] h-full overflow-hidden relative">
              <Image
                alt="Exercise"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                fill
              />
            </div>
            <div className="pr-3">
              <p className="text-[14px]">{exercise.name}</p>
              <div className="flex">
                <div className="rounded-md mt-1 text-center bg-[#DAF6E0] text-[#015212] px-2 text-[11px] h-[16px]">
                  {exercise.primaryFocus}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}