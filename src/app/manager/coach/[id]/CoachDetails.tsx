'use client';

import { useState } from 'react';
import TrainerCard from '@/app/landing/TrainerCard';
import HomeLayout from '@/layouts/HomeLayout';
import Header from '../../Header';
import { useRouter } from 'next/navigation';

export default function CoachDetails() {
  return (
    <>
      <Header 
        pageTitle="Coach"
      />
    </>
  );
};