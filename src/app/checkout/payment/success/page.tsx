"use client";

import Button from "@/components/global/Button";
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");

  return (
    <div className="payment-success-page w-[700px] m-auto py-[100px]">
      <div className="text-center">
        <div className="m-auto w-[40px] h-[40px] bg-emerald-500 rounded-full flex items-center">
          <BsCheckLg className="dark:fill-green-900 fill-white w-7 h-7 m-auto" />
        </div>
        <h4 className={`${primaryTextColor} text-[22px] pt-4`}>
          Payment success!
        </h4>
        <h1 className={`${primaryTextColor} text-[28px] font-semibold pt-2`}>
          PHP 1,000,000
        </h1>
      </div>
      <div className="mt-10 w-[500px] m-auto">
        <ul className="mt-3">
          <li className="flex justify-between py-3">
            <div className={`${tertiaryTextColor}`}>
              Transaction Id
            </div>
            <div className={`${primaryTextColor}`}>
              {transactionId}
            </div>
          </li>
          <li className="flex justify-between py-3">
            <div className={`${tertiaryTextColor}`}>
              Payment Status
            </div>
            <div className={`${primaryTextColor}`}>
              Success
            </div>
          </li>
          <li className="flex justify-between py-3">
            <div className={`${tertiaryTextColor}`}>
              Payment Time
            </div>
            <div className={`${primaryTextColor}`}>
              Mar 22, 2023, 13:22:33
            </div>
          </li>
        </ul>
        <Button 
          className="w-full mt-3"
          variant="outlined"
          endIcon={<AiOutlineArrowRight />}
          onClick={() => router.push('/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};