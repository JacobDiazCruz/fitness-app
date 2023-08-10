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
      <div className="navbar p-5">
        <div className={`${tertiaryTextColor} flex items-center cursor-pointer gap-[10px] text-[16px]`}>
          <AiOutlineArrowLeft />
          Back to home
        </div>
      </div>

      <div className="body w-[85%] md:w-[1200px] mt-[70px] mx-auto flex">
        <div className="w-[40%] md:block hidden">
          <div className="title">
            <h1 className={`${secondaryTextColor} font-semibold text-[18px]`}>Your exercises today</h1>
            <div className={`${tertiaryTextColor} text-[14px]`}>July 20, 2023</div>
          </div>
          <div className="paths mt-[50px]">
            {paths.map((path: any, index: number) => (
              <div className={`path ${index % 2 === 1 ? 'ml-[150px]' : ''} ${path.status === 'ACTIVE' && 'active-exercise'} `} key={index}>
                <div className="bg-[#211234] text-[#B084E9] w-fit rounded-md px-1 text-[12px]">
                  {path.primaryFocus}
                </div>
                <div className="border border-[#303030] bg-[#131313] rounded-md text-[#B4B4B4] w-fit px-2 py-1 text-[14px]">
                  {path.name}
                </div>
                <div className="mt-1 ml-6">
                  <PathBox pathStatus={path.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${borderColor} border-l pl-[80px] w-[60%]`}>
          <div className="flex items-center gap-[10px] mb-10">
            <div className={`text-[18px] font-semibold ${secondaryTextColor}`}>
              Dumbbell press 5x5
            </div>
            <div className="w-fit rounded-lg bg-violet-950 px-1 text-[12px] text-violet-300">
              Shoulders
            </div>
          </div>
          <div className="mt-7 flex gap-[50px]">
            <iframe 
              width="350" 
              height="300"
              className={`${borderColor} rounded-3xl border`}
              src="https://www.youtube.com/embed/_sF1BI8?autoplay=1" 
              title="YouTube Video"
              allowFullScreen
            ></iframe>
            <div className={`${borderColor} bg-gradient-to-r from-neutral-900 to-neutral-950 sets rounded-3xl border p-6 flex gap-[40px] w-fit`}>
              <div>
                <div className={`${secondaryTextColor}`}>Sets</div>
                <div className={`${tertiaryTextColor}`}>1</div>
                <div className={`${tertiaryTextColor}`}>2</div>
              </div>
              <div>
                <div className={`${secondaryTextColor}`}>Reps</div>
                <div className={`${tertiaryTextColor}`}>1</div>
                <div className={`${tertiaryTextColor}`}>2</div>
              </div>
              <div>
                <div className={`${secondaryTextColor}`}>Rest</div>
                <div className={`${tertiaryTextColor}`}>00:00</div>
                <div className={`${tertiaryTextColor}`}>00:00</div>
              </div>
            </div>
          </div>
          <div className="coach-instructions flex items-center gap-[5px] mt-7">
            <div className="w-[45px] h-[45px] rounded-full relative overflow-hidden">
              <Image 
                src={localStorage.getItem("thumbnailImage") || "/"}
                fill
                alt="Trainer Image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={`${secondaryTextColor} font-light text-[14px] rounded-xl p-3 w-fit dark:bg-neutral-50 bg-neutral-700`}>
              <div className="dark:text-neutral-900 text-white w-[300px]">
                Make sure you go all the way down and focusing on the quads more.
              </div>
            </div>
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