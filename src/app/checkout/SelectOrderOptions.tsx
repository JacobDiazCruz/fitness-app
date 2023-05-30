'use client';

import { useState } from "react";
import { Box, Typography } from "@mui/material";
interface OrderOption {
  price: number;
  title: string;
  isSelected: boolean;
  description: string;
};

export default function SelectOrderOptions() {
  const [orderOptions, setOrderOptions] = useState<OrderOption>([
    {
      price: 2000,
      title: 'Fitness Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    },
    {
      price: 3000,
      title: 'Nutrition Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    },
    {
      price: 1000,
      title: 'Healthy Plan',
      isSelected: false,
      description: 'I will be your online personal trainer for a month 24 7 on line'
    }
  ]);

  return (
    <>
      <div className="bg-white p-6 w-[682px]">
        <h5>Select Order Options</h5>
        {orderOptions.map((orderOption: OrderOption, key: number) => (
          <div 
            onClick={() => {
              const newOrderOptions = [...orderOptions];
              newOrderOptions[key].isSelected = !orderOptions[key].isSelected;
              setOrderOptions(newOrderOptions);
            }}
            className={`flex p-4 mt-4 rounded-lg border border-solid cursor-pointer justify-between ${orderOption.isSelected ? 'border-[#24282C]' : 'border-[#D9D9D9]'}`}
          >
            <div>
              <p className="text-[18px] text-[#636363]">{orderOption.price}</p>
              <p className="font-bold">{orderOption.title}</p>
              <p className="mt-1 text-[#7C7C7C]">{orderOption.description}</p>
            </div>

            <div className={`w-[30px] h-[30px] border border-solid rounded-full flex items-center ${orderOption.isSelected ? 'border-[#24282C]' : 'border-[##D9D9D9]'}`}>
              {orderOption.isSelected && (
                <div
                  className="m-auto w-[20px] h-[20px] rounded-full bg-[#24282C]"
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}