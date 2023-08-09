"use client";

import Button from "@/components/global/Button";
import { borderColor, primaryBgColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Workout() {
  
  const [paths, setPaths] = useState([
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    },
    {
      primaryFocus: "Shoulders",
      name: "Dumbbell press",
      isCompleted: false
    }
  ]);

  return (
    <div className={`interactive-workout-page ${primaryBgColor}`}>
      <div className="navbar p-5">
        <div className={`${tertiaryTextColor} flex items-center cursor-pointer gap-[10px] text-[16px]`}>
          <AiOutlineArrowLeft />
          Back to home
        </div>
      </div>

      <div className="body w-[85%] md:w-[1200px] mt-[70px] mx-auto flex">
        <div className="w-[40%]">
          <div className="title">
            <h1 className={`${secondaryTextColor} font-semibold text-[18px]`}>Your exercises today</h1>
            <div className={`${tertiaryTextColor} text-[14px]`}>July 20, 2023</div>
          </div>
          <div className="paths mt-[50px]">
            {paths.map((path: any, index: number) => (
              <div className={`path ${index % 2 === 1 ? 'ml-[150px]' : ''}`} key={index}>
                <div className="bg-[#211234] text-[#B084E9] w-fit rounded-md px-1 text-[12px]">
                  {path.primaryFocus}
                </div>
                <div className="border border-[#303030] bg-[#131313] rounded-md text-[#B4B4B4] w-fit px-2 py-1 text-[14px]">
                  {path.name}
                </div>
                <div className="container-cube mt-6 ml-10">
                  <div className="cube">
                    <div className={`face border top`}></div>
                    <div className={`face border bottom`}></div>
                    <div className={`face border left`}></div>
                    <div className={`face border right`}></div>
                    <div className={`face border front`}></div>
                    <div className={`face border back`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${borderColor} border-l pl-[80px] w-[60%]`}>
          <div className="flex items-center">
            <div className={`text-[18px] font-semibold ${secondaryTextColor}`}>
              Dumbbell press 5x5
            </div>
          </div>
          <div className={`${secondaryTextColor} mt-5 font-light text-[14px]`}>
            I’m getting past my struggles with shoulders. I’m realizing how important the shoulders are for other parts’ exercises. I need these shoulders, gosh darnit!
          </div>
          <div className="mt-7 flex">
            <iframe 
              width="450" 
              height="400"
              src="https://www.youtube.com/embed/_sF1BI8?autoplay=1" 
              title="YouTube Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className={`actionbar border md:w-[600px] ${borderColor} bg-[#131313] rounded-2xl m-auto fixed bottom-3 md:bottom-10 left-3 right-3 md:left-0 md:right-0`}>
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