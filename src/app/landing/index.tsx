'use client';

import Image from 'next/image'
import TrainerCard from './TrainerCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Landing() {
  const router = useRouter();
  const [trainersList, setTrainersList] = useState([
    1,2,3,4,5,69,7
  ]);

  return (
    <div className="landing-page">
      <div>
        <h1 className="text-[62px] font-bold">Train with better coaches</h1>
        <p className="text-[24px] text-gray-600 mt-1">
          Discover the best coaches that can help you achieve your fitness goals
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-20">
        {trainersList.map(trainer => (
          <div 
            onClick={() => router.push('/trainer')}
            style={{
              paddingRight: '15px',
              paddingBottom: '15px'
            }}
          >
            <TrainerCard />
          </div>
        ))}
      </div>
    </div>
  );
};