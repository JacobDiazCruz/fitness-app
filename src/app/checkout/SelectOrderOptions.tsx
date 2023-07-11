'use client';

import DatePickerField from "@/components/global/DatePickerField";
import FieldName from "@/components/global/FieldName";
import { CoachingService } from "@/utils/coachTypes";
import { Dispatch, SetStateAction, useState } from "react";

export interface SelectOrderOptionsProps {
  orderOptions: CoachingService[];
  setOrderOptions: Dispatch<SetStateAction<any>>;
};

export default function SelectOrderOptions({
  orderOptions = [],
  setOrderOptions
}: SelectOrderOptionsProps) {

  const [startingDate, setStartingDate] = useState(null);

  return (
    <>
      <div className="bg-white p-6 w-[682px]">
        <h5>Select Order Options</h5>
        {orderOptions?.map((orderOption: CoachingService, key: number) => (
          <div 
            onClick={() => {
              const newOrderOptions = [...orderOptions];
              newOrderOptions[key].isSelected = !orderOptions[key].isSelected;
              setOrderOptions(newOrderOptions);
            }}
            className={`flex p-4 mt-4 rounded-lg border border-solid cursor-pointer justify-between ${orderOption.isSelected ? 'border-[#24282C]' : 'border-[#D9D9D9]'}`}
          >
            <div>
              <p className="text-[18px] text-[#636363]">
              {orderOption.price.currency} {orderOption.price.value}
              </p>
              <p className="font-bold">
                {orderOption.title}
              </p>
              <p className="mt-1 text-[#7C7C7C]">
                {orderOption.description}
              </p>
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

        <div className="mt-7">
          <FieldName>
            Preferred starting date
          </FieldName>
          <DatePickerField
            className="w-full"
            value={startingDate}
            onChange={(val: any) => setStartingDate(val)}
          />
        </div>
      </div>
    </>
  );
}