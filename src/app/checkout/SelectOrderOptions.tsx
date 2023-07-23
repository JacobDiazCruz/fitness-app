'use client';

import DatePickerField from "@/components/global/DatePickerField";
import FieldName from "@/components/global/FieldName";
import { CoachingService } from "@/utils/coachTypes";
import { Dispatch, SetStateAction, useState } from "react";

export interface SelectOrderOptionsProps {
  orderOptions: CoachingService[];
  selectedPlan: any;
  setOrderOptions: Dispatch<SetStateAction<any>>;
  coachingPlans: any;
};

export default function SelectOrderOptions({
  orderOptions = [],
  selectedPlan,
  setOrderOptions,
  coachingPlans = []
}: SelectOrderOptionsProps) {

  const [startingDate, setStartingDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (val: Date) => {
    setStartingDate(val);
    const thirtyDaysAfter = new Date(val);
    thirtyDaysAfter.setDate(thirtyDaysAfter.getDate() + 30);
    setEndDate(thirtyDaysAfter)
  };

  return (
    <>
      <div className="bg-white pr-6 w-[500px]">
        <div>
          <h5 className="font-semibold">Coaching Plan Details</h5>
          <div className="mt-5">
            {selectedPlan?.name}
          </div>
        </div>
        {/* <div>
          <h5 className="font-semibold">Select Plan</h5>
          {coachingPlans.map((plan: any, index: number) => (
            <div 
              className={`flex p-4 mt-4 rounded-lg border border-solid cursor-pointer justify-between ${plan.isSelected ? 'border-[#24282C]' : 'border-[#D9D9D9]'}`}
            >
              <div>
                <p className="mt-1 text-neutral-950 font-semibold">
                  {plan.name}
                </p>
                <p className="text-[14px] mt-1 text-neutral-500 font-light">
                  {plan.description}
                </p>
                <p className="text-neutral-700 font-light mt-2">
                  {plan.price.currency} {plan.price.value}
                </p>
              </div>

              <div className={`w-[25px] h-[25px] border border-solid rounded-full flex items-center ${plan.isSelected ? 'border-[#24282C]' : 'border-[##D9D9D9]'}`}>
                {plan.isSelected && (
                  <div
                    className="m-auto w-[15px] h-[15px] rounded-full bg-[#24282C]"
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div> */}
        
        <div className="mt-10">
          <h5 className="font-semibold">Select Coaching Services</h5>
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
                <p className="font-semibold">
                  {orderOption.title}
                </p>
                <p className="text-[14px] mt-1 text-neutral-500 font-light">
                  {orderOption.description}
                </p>
                <p className="text-neutral-700 font-light mt-2">
                  {orderOption.price.currency} {orderOption.price.value}
                </p>
              </div>

              <div className={`w-[25px] h-[25px] border border-solid rounded-full flex items-center ${orderOption.isSelected ? 'border-[#24282C]' : 'border-[##D9D9D9]'}`}>
                {orderOption.isSelected && (
                  <div
                    className="m-auto w-[15px] h-[15px] rounded-full bg-[#24282C]"
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <FieldName>
            Preferred starting date
          </FieldName>
          <DatePickerField
            value={startingDate}
            onChange={(val: any) => handleDateChange(val)}
          />
        </div>
        {startingDate && (
          <div className="mt-7">
            <FieldName>
              Estimated end date
            </FieldName>
            <p>
              {endDate?.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </>
  );
}