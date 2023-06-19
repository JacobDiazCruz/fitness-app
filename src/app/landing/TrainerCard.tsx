'use client';

import { useState } from 'react';
import TrainerRating from '../trainer/TrainerRating';
import Image from 'next/image';

interface Trainer {
  name: string;
  description: string;
  displayedPrice: number;
  status: string;
};

export default function TrainerCard() {
  const [trainerData, setTrainerData] = useState<Trainer>({
    name: "John Doe",
    description: "I will be your online personal trainer and nutritionist",
    displayedPrice: 200,
    status: "Top Coach"
  });

  const cardSize = 'xl:w-[415px] 2xl:w-[342px]';

  return (
    <div className={`${cardSize} dark:bg-neutral-950 bg-white rounded-lg h-[390px] overflow-hidden cursor-pointer`}>
      <div className="w-full h-[200px] relative overflow-hidden">
        <Image
          alt="Cover Image"
          fill
          style={{ objectFit: 'cover' }}
          src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png" 
        />
      </div>
      <div className="p-[15px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[35px] h-[35px] rounded-full relative overflow-hidden">
            <Image
              alt="Cover Image"
              fill
              style={{ objectFit: 'cover' }}
              src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png" 
            />
          </div>
          <p className="dark:text-neutral-50 text-neutral-900">John Doe</p>
        </div>
        <div className="mt-4">
          <p className="dark:text-neutral-50 text-neutral-900 text-[14px] leading-[20px]">
            I will be your online personal trainer and nutritionist
          </p>
          <TrainerRating />
          <div className="pt-2 flex justify-between">
            <div className="rounded-md bg-[#EEE0D3] text-[#9A4A00] text-[12px] text-center px-2 py-1">
              Top Coach
            </div>
            <div className="dark:text-neutral-50 text-neutral-900 text-[18px] font-medium">
              $200<span className="text-[16px] text-[#9A9A9A]">/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}