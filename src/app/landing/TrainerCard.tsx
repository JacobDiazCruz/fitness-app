import React, { useState } from 'react';
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

  return (
    <div className="bg-white rounded-lg w-[342px] h-[390px] overflow-hidden cursor-pointer">
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
          <p>John Doe</p>
        </div>
        <div className="mt-4">
          <p className="text-[14px] leading-[20px]">
            I will be your online personal trainer and nutritionist
          </p>
          <TrainerRating />
          <div className="pt-2 flex justify-between">
            <div className="rounded-md bg-[#EEE0D3] text-[#9A4A00] text-[12px] text-center px-2 py-1">
              Top Coach
            </div>
            <div className="text-[18px] font-medium">
              $200<span className="text-[16px] text-[#9A9A9A]">/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}