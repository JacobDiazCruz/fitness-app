'use client';

import { useState } from 'react';
import CoachRating from '../CoachRating';
import Image from 'next/image';
import { borderColor } from '@/utils/themeColors';

interface Props {
  firstName: string;
  lastName: string;
  profileImage: any;
  userId: string;
  reviews: Array<any>;
  about: string;
};

export default function Coach({
  firstName,
  lastName,
  profileImage,
  userId,
  reviews,
  about
}: Props) {
  const [trainerData, setTrainerData] = useState<any>({
    name: "John Doe",
    description: "I will be your online personal trainer and nutritionist",
    displayedPrice: 200,
    status: "Top Coach"
  });

  const cardSize = 'xl:w-[415px] 2xl:w-[342px]';

  return (
    <div className={`
      ${cardSize}
      ${borderColor}
      border
      dark:bg-darkTheme-900 bg-white rounded-lg h-[390px] overflow-hidden cursor-pointer
    `}>
      <div className="w-full h-[200px] relative overflow-hidden">
        {profileImage?.thumbnailImage && (
          <Image
            alt="Cover Image"
            fill
            style={{ objectFit: 'cover' }}
            src={profileImage?.thumbnailImage}
          />
        )}
      </div>
      <div className="p-[15px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[35px] h-[35px] rounded-full relative overflow-hidden">
            {profileImage?.thumbnailImage && (
              <Image
                alt="Cover Image"
                fill
                style={{ objectFit: 'cover' }}
                src={profileImage?.thumbnailImage ?? "/"}
              />
            )}
          </div>
          <p className="dark:text-neutral-50 text-darkTheme-900 truncate w-[90%]">
            {firstName} {lastName}
          </p>
        </div>
        <div className="mt-4">
          <p className="dark:text-neutral-50 text-darkTheme-900 text-[14px] leading-[20px]">
            I will be your online personal trainer and nutritionist
          </p>
          <CoachRating />
          <div className="pt-2 flex justify-between">
            <div className="rounded-md bg-[#EEE0D3] text-[#9A4A00] text-[12px] text-center px-2 py-1">
              Top Coach
            </div>
            <div className="dark:text-neutral-50 text-darkTheme-900 text-[18px] font-medium">
              $200<span className="text-[16px] text-[#9A9A9A]">/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}