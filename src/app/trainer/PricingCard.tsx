import { useState } from "react";
import { useRouter } from 'next/navigation';

interface Props {
  featuredPrice?: number;
  featuredLength?: string;
  packageList?: Array<string>;
};

export default function PricingCard({
  featuredPrice,
  featuredLength,
  packageList
}: Props) {
  const router = useRouter();

  const list = packageList?.map((item) => (
    <li className="flex items-center py-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#21C79F" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <p className="ml-2">{item}</p>
    </li>
  ));

  return (
    <div className="w-[500px] h-[467px] bg-white rounded-lg p-6 sticky top-[5em]">
      <div className="flex items-center">
        <h3 className="text-[28px]">{featuredPrice}</h3>
        <span className="ml-1">/ {featuredLength}</span>
      </div>
      <div className="mt-4">
        <button className="btn btn-dark w-full h-[53px]">
          Get now
        </button>
        <button className="btn btn-outlined w-full h-[53px] mt-3">
          Message
        </button>
      </div>
      <ul className="max-w-md space-y-1 list-inside mt-7">
        {list}
      </ul>
    </div>
  );
}