import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Container from "@/components/global/Container";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Button from "@/components/global/Button";
import useVerifyUser from "@/hooks/useVerifyUser";

interface Props {
  coachUserId?: string;
  featuredPrice?: number;
  featuredLength?: string;
  services?: Array<any>;
};

export default function PricingCard({
  coachUserId,
  featuredPrice,
  featuredLength,
  services = []
}: Props) {
  const router = useRouter();
  const { triggerVerification } = useVerifyUser();
  const params = useParams();
  useEffect(() => {
    console.log("services", services)
  }, [services]);

  const list = services?.map((service: any) => (
    <li className="flex items-center py-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#21C79F" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <p className={`${secondaryTextColor} ml-2`}>
        {service?.title}
      </p>
    </li>
  ));

  return (
    <div className="h-[467px] w-[380px] sticky top-[5em]">
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
          <Button 
            variant="contained" 
            className="w-full"
            onClick={() => {
              triggerVerification();
            }}
          >
            Get now
          </Button>
          <Button 
            variant="outlined" 
            className="w-full mt-4"
            onClick={() => {
              triggerVerification();
              router.push(`/manager/messages/new?receiverId=${coachUserId}`)
            }}
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