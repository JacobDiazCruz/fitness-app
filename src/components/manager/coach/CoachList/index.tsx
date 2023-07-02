'use client';

import { useRouter } from 'next/navigation';
import { listCoaches } from '@/api/Profile';
import { useQuery } from 'react-query';
import Coach from './Coach';

export default function CoachList({
  isAuth = true
}: {
  isAuth: boolean;
}) {
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
              if(isAuth) {
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