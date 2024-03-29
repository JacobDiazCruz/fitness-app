"use client";

import CoachList from "@/components/global/CoachList";

const Landing: React.FC = () => {
  return (
    <div className="landing-page min-h-[100vh] py-[100px]">
      <div>
        <h1 className="dark:text-neutral-50 text-darkTheme-950 text-[62px] font-bold">
          Train with better coaches
        </h1>
        <p className="dark:text-neutral-200 text-neutral-800 text-[24px] text-gray-600 mt-1">
          Discover the best coaches that can help you achieve your fitness goals
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-20">
        <CoachList />
      </div>
    </div>
  );
};

export default Landing;