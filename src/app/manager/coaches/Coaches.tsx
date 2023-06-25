'use client';

import { useEffect, useState } from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import Header from '../Header';
import { useRouter } from 'next/navigation';
import TrainerCard from '@/components/manager/coach/TrainerCard';
import { listCoaches } from '@/api/Profile';
import { useQuery } from 'react-query';
import { secondaryBgColor, tertiaryBgColor } from '@/utils/themeColors';

export default function Coaches() {
  const router = useRouter();
  const { 
    isLoading, 
    isError,
    data: coaches,
    error
  } = useQuery('listCoaches', listCoaches, {
    refetchOnMount: true
  });

  return (
    <div className="coaches">
      <Header
        pageTitle="Coaches"
      />
      <div className="flex flex-wrap items-center">
        {coaches?.map((coach: any, index: number) => {
          if(isLoading) {
            return (
              <>
                <div className={`${secondaryBgColor} xl:w-[415px] 2xl:w-[342px] rounded-lg h-[390px]`} />
                <div className={`${secondaryBgColor} xl:w-[415px] 2xl:w-[342px] rounded-lg h-[390px]`} />
              </>
            );
          } else {
            const {
              _id,
              firstName,
              lastName,
              profileImage,
              userId,
              reviews,
              about
            } = coach;
            return (
              <div
                key={index}
                onClick={() => router.push(`/manager/coach/${_id}`)}
                style={{
                  paddingRight: '15px',
                  paddingBottom: '15px'
                }}
              >
                <TrainerCard 
                  firstName={firstName}
                  lastName={lastName}
                  profileImage={profileImage}
                  userId={userId}
                  reviews={reviews}
                  about={about}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};