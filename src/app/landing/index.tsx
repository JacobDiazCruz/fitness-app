'use client';

import Image from 'next/image'
import styles from '../page.module.css';
import TrainerCard from './TrainerCard';
import HomeLayout from '@/layouts/HomeLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Landing() {
  const router = useRouter();
  const [trainersList, setTrainersList] = useState([
    1,2,3,4,5,67,7
  ]);

  return (
    <HomeLayout>
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
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
    </HomeLayout>
  );
};