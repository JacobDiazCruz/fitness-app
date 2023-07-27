import { useParams, useRouter } from 'next/navigation';
import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import Button from "@/components/global/Button";
import useVerifyUser from "@/hooks/useVerifyUser";
import { useQuery } from 'react-query';
import { listCoachingPlans } from '@/api/CoachingPlan';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import Menu, { MenuItem, MenuItems } from '../Menu';
import { MdArrowDropDown } from 'react-icons/md';

interface Props {
  coachingPlans: any;
  coachUserId?: string;
  featuredLength?: string;
  services?: Array<any>;
  selectedPlan: any;
  isLoadingCoachingPlans: boolean;
  setSelectedPlan: any;
  openCheckoutModal: () => void;
};

export default function CoachDetailsPricingCard({
  coachingPlans,
  coachUserId,
  featuredLength,
  selectedPlan,
  setSelectedPlan,
  isLoadingCoachingPlans,
  openCheckoutModal,
  services = []
}: Props) {
  const router = useRouter();

  const dropdownRef: MutableRefObject<any> = useRef(null);
  const [showPlansListMenu, setShowPlansListMenu] = useState<boolean>(false);  
  
  const { triggerVerification } = useVerifyUser();

  useEffect(() => {
    if(coachingPlans) {
      setSelectedPlan(coachingPlans[0]);
    }
  }, [coachingPlans]);

  const togglePlansListMenu = () => {
    setShowPlansListMenu((prev) => !prev);
  };

  const list = selectedPlan?.services.map((service: any) => (
    <li className="flex items-center py-2">
      <FaCheck className="w-4 h-4 text-teal-500"/>
      <p className={`${secondaryTextColor} ml-3`}>
        {service}
      </p>
    </li>
  ));

  if(isLoadingCoachingPlans) {
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
      <div className={`w-full border-b ${borderColor}`}>
        <div 
          ref={dropdownRef}
          onClick={() => togglePlansListMenu()}
          className={`p-4 flex items-center gap-[7px] font-semibold cursor-pointer ${secondaryTextColor}`}
        >
          {selectedPlan?.name}
          <MdArrowDropDown />
        </div>
        <Menu
          buttonRef={dropdownRef}
          open={showPlansListMenu}
          setIsDropdownOpen={setShowPlansListMenu}
        >
          <MenuItems>
            {coachingPlans?.map((plan: any, index: number) => (
              <MenuItem 
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPlansListMenu(false);
                }}
              >
                {plan.name}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>

      <div className="px-4 py-8 md:p-8">
        <div className="flex items-center">
          <h3 className={`${primaryTextColor} text-[28px]`}>
            &#x20B1; {selectedPlan?.totalPrice.value}
          </h3>
          <span className={`${tertiaryTextColor} ml-3 mt-1`}>
            / session
          </span>
        </div>
        <div className={`${secondaryTextColor} mt-3 mb-8 text-[14px]`}>
          {selectedPlan?.description}
        </div>
        <div className="mt-4">
          <Button 
            variant="contained"
            className="w-full"
            onClick={() => {
              triggerVerification();
              openCheckoutModal();
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