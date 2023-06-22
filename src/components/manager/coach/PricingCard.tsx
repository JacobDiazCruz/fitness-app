import { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Container from "@/components/global/Container";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Button from "@/components/global/Button";

interface Props {
  coachUserId?: string;
  featuredPrice?: number;
  featuredLength?: string;
  packageList?: Array<string>;
};

export default function PricingCard({
  coachUserId,
  featuredPrice,
  featuredLength,
  packageList
}: Props) {
  const router = useRouter();
  const params = useParams();

  const list = packageList?.map((item) => (
    <li className="flex items-center py-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#21C79F" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <p className={`${secondaryTextColor} ml-2`}>
        {item}
      </p>
    </li>
  ));

  return (
    <div className="w-[500px] h-[467px] sticky top-[5em]">
      <Container>
        <div className="flex items-center">
          <h3 className={`${primaryTextColor} text-[28px]`}>
            {featuredPrice}
          </h3>
          <span className={`${secondaryTextColor} ml-1`}>
            / {featuredLength}
          </span>
        </div>
        <div className="mt-4">
          <Button variant="contained" className="w-full">
            Get now
          </Button>
          <Button 
            variant="outlined" 
            className="w-full mt-4"
            onClick={() => router.push(`/manager/messages/new?receiverId=${coachUserId}`)}
          >
            Message
          </Button>
        </div>
        <ul className="max-w-md space-y-1 list-inside mt-7">
          {list}
        </ul>
      </Container>
    </div>
  );
}