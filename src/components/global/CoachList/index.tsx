'use client';

import { useParams, useRouter } from 'next/navigation';
import { listCoaches } from '@/api/Profile';
import { useQuery } from 'react-query';
import Coach from './Coach';
import { tertiaryBgColor } from '@/utils/themeColors';

export default function CoachList() {
  const router = useRouter();
  const params = useParams();

  const {
    isLoading, 
    data: coaches
  } = useQuery('listCoaches', listCoaches, {
    refetchOnMount: true
  });

  if(isLoading) {
    return (
      <div className="flex flex-wrap items-center">
        <div className={`${tertiaryBgColor} w-[350px] h-[350px] rounded-lg mr-5`} />
        <div className={`${tertiaryBgColor} w-[350px] h-[350px] rounded-lg`} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center">
      {coaches?.map((coach: any, index: number) => {
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
            onClick={() => {
              if(window?.location.href.includes('manager')) {
                router.push(`/manager/coach/${_id}`);
              } else {
                router.push(`/coach/${_id}`);
              }
            }}
            style={{
              paddingRight: '15px',
              paddingBottom: '15px'
            }}
          >
            <Coach 
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
              userId={userId}
              reviews={reviews}
              about={about}
            />
          </div>
        );
      })}
    </div>
  );
};