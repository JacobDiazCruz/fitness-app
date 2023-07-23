import { useParams, useRouter } from 'next/navigation';
import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import Button from "@/components/global/Button";
import useVerifyUser from "@/hooks/useVerifyUser";
import { useQuery } from 'react-query';
import { listCoachingPlans } from '@/api/CoachingPlan';
import { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";

interface Props {
  coachUserId?: string;
  featuredLength?: string;
  services?: Array<any>;
};

export default function CoachDetailsPricingCard({
  coachUserId,
  featuredLength,
  services = []
}: Props) {
  const params = useParams();
  const router = useRouter();
  const { triggerVerification } = useVerifyUser();

  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // list coaching plans
  const {
    isLoading,
    data: coachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    if(coachingPlans) {
      setSelectedPlan(coachingPlans[0]);
    }
  }, [coachingPlans]);

  const list = services?.map((service: any) => (
    <li className="flex items-center py-2">
      <FaCheck className="w-4 h-4 text-teal-500"/>
      <p className={`${secondaryTextColor} ml-3`}>
        {service?.title}
      </p>
    </li>
  ));

  if(isLoading) {
    return <></>;
  }

  return (
    <div
      className={`
        ${borderColor}
        ${secondaryBgColor}
        dark:border form shadow-md width-full rounded-lg
      `}
    >
      <div className={`w-full flex border-b ${borderColor}`}>
        {coachingPlans?.map((plan: any, index: number) => (
          <div 
            key={index}
            onClick={() => setSelectedPlan(plan)}
            className={`${borderColor} ${secondaryTextColor} flex-1 border-r last:border-r-none text-center cursor-pointer`}
          >
            <div className={`p-4 font-semibold ${plan._id === selectedPlan?._id && 'text-teal-500'}`}>
              {plan.name}
            </div>
            {plan._id === selectedPlan?._id && (
              <div className="w-full h-[3px] bg-teal-500 bottom-0"></div>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-8 md:p-8">
        <div className="flex items-center">
          <h3 className={`${primaryTextColor} text-[28px]`}>
            {selectedPlan?.price.currency} {selectedPlan?.price.value}
          </h3>
          <span className={`${tertiaryTextColor} ml-3 mt-1`}>
            / {selectedPlan?.price.timeLength} {selectedPlan?.price.timeUnit}
          </span>
        </div>
        <div className="mt-4">
          <Button 
            variant="contained" 
            className="w-full"
            onClick={() => {
              triggerVerification();
              router.push(`/checkout/select-options/${params.id}`);
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
      </div>
    </div>
  );
}