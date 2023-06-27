'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CoachList from '@/components/manager/coach/CoachList';

const Landing: React.FC = () => {
  const router = useRouter();
  const [trainersList, setTrainersList] = useState<number[]>([
    1,2,3,4,5,69
  ]);

  return (
    <div className="landing-page min-h-[100vh]">
      <div>
        <h1 className="dark:text-neutral-50 text-neutral-950 text-[62px] font-bold">
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