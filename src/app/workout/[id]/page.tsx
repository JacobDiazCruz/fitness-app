"use client";

import Button from "@/components/global/Button";
import { BoxActive, BoxDefault, BoxDone } from "@/components/global/Icons";
import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Workout() {
  
  const [paths, setPaths] = useState([
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "DONE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "ACTIVE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "INACTIVE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "INACTIVE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "INACTIVE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "INACTIVE"
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      status: "INACTIVE"
    }
  ]);

  const PathBox = ({ pathStatus }: any) => {
    switch(pathStatus) {
      case "ACTIVE":
        return <BoxActive />;
      case "DONE":
        return <BoxDone />;
      default:
        return <BoxDefault />;
    }
  }

  return (
    <div className={`interactive-workout-page`}>
      <div className="body w-full h-[80vh] mx-auto flex md:flex-row flex-col">
        <div className="p-3">
          <div className={`text-[16px] font-semibold ${secondaryTextColor}`}>
            Dumbbell press 5x5
          </div>
          <div className="w-fit rounded-lg bg-violet-950 px-1 text-[12px] text-violet-300">
            Shoulders
          </div>
          <div className="coach-instructions flex flex-col gap-[5px] mt-7">
            <div className="-mb-4">
              <div className="w-[45px] h-[45px] rounded-full relative overflow-hidden">
                <Image 
                  src={localStorage.getItem("thumbnailImage") || "/"}
                  fill
                  alt="Trainer Image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={`${secondaryTextColor} font-light text-[14px] rounded-xl p-3 w-fit dark:bg-neutral-50 bg-neutral-200`}>
              <div className="dark:text-neutral-900 text-neutral-950 dark:text-white w-[150px] mt-1 text-[12px]">
                Make sure you go all the way down and focusing on the quads more.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex items-center">
          <div className="flex gap-[50px] m-auto w-full h-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2Z9g-AZinUc?autoplay=1" 
              title="YouTube Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="p-3 h-full w-[45%] overflow-y-auto overflow-x-hidden">
          <div className="title mb-2">
            <div className={`${tertiaryTextColor} text-[13px]`}>Chest Workout</div>
          </div>
          {paths.map((exercise: any, index: number) => (
            <div key={index} className={`p-2 w-[200px] border ${borderColor} mb-2`}>
              <div className={`${secondaryTextColor} text-[13px]`}>
                {exercise.name}
              </div>
              <div className="w-fit rounded-lg bg-violet-950 px-1 text-[10px] text-violet-300">
                Shoulders
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`actionbar border-t w-full ${borderColor} bg-[#131313] m-auto bottom-0 left-3 right-3 md:left-0 md:right-0`}>
        <div className="flex items-center justify-between p-5">
          <div className="col-1">
            <div className={`text-neutral-400 text-[12px]`}>
              Next workout:
            </div>
            <div className={`text-neutral-200 text-[14px] md:text-[16px]`}>
              Incline Bench Press
            </div>
          </div>
          <Button variant="contained">
            Start 1st set
          </Button>
        </div>
      </div>
    </div>
  );
}