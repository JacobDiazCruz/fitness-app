'use client';

import { useState } from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import Header from '../Header';
import { useRouter } from 'next/navigation';
import TrainerCard from '@/components/manager/coach/TrainerCard';

export default function Coaches() {
  const router = useRouter();
  const [trainersList, setTrainersList] = useState([
    1,2,3,4,5,67,7
  ]);

  return (
    <>
      <Header 
        pageTitle="Coaches"
      />
      <div className="flex flex-wrap items-center">
        {trainersList.map(trainer => (
          <div
            onClick={() => router.push('/manager/coach/648b0216c03d32d5e87f6720')}
            style={{
              paddingRight: '15px',
              paddingBottom: '15px'
            }}
          >
            <TrainerCard />
          </div>
        ))}
      </div>
    </>
  );
};