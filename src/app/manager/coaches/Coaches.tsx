'use client';

import { useState } from 'react';
import TrainerCard from '@/app/landing/TrainerCard';
import HomeLayout from '@/layouts/HomeLayout';
import Landing from '../../landing';
import Header from '../Header';
import { useRouter } from 'next/navigation';

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
            onClick={() => router.push('/manager/coach/123')}
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