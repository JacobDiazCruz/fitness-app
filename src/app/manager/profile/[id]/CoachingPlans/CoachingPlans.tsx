
import { Dispatch, SetStateAction, useState } from "react";
import FormContainer from "../FormContainer";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { CoachingService } from "@/utils/coachTypes";
import { LuPackage } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import IconButton from "@/components/global/IconButton";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import EditCoachingPlanModal from "./EditCoachingPlanModal";

interface CoachingPlansProps {
  servicesList: CoachingService[];
  setServicesList: any;
  plansList: CoachingService[];
}

export default function CoachingPlans({
  servicesList,
  setServicesList,
  plansList
}: CoachingPlansProps) {

  const [showEditCoachingPlan, setShowEditCoachingPlan] = useState<boolean>(false);

  return (
    <FormContainer
      formTitle="Coaching Plans"
      formIcon={<LuPackage className={`${secondaryTextColor} w-7 h-7 m-auto`}/>}
      formDescription="Each plan consists of many services."
    >
      <div className="mt-5 flex gap-[20px]">
        {plansList.length ? (
          <>
            {plansList.map((plan: any, index: number) => (
              <div key={index} className={`${borderColor} py-5 flex-1 overflow-hidden border p-6 rounded-lg`}>
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className={`${primaryTextColor} mb-2 text-[18px] font-semibold`}>
                        {plan.name}
                      </p>
                      <p className={`${secondaryTextColor} text-[16px]`}>
                        {plan.totalPrice.currency} {plan.totalPrice.value}
                      </p>
                    </div>
                    <div>
                      <IconButton 
                        onClick={() => setShowEditCoachingPlan(true)}
                      >
                        <HiOutlinePencil className={`${secondaryTextColor}`} />
                      </IconButton>
                      <IconButton>
                        <HiOutlineTrash className={`${secondaryTextColor}`} />
                      </IconButton>
                    </div>
                  </div>
                  <p className={`${tertiaryTextColor} mb-2 text-[14px]`}>
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <p className={`${secondaryTextColor} mb-2 text-[14px]`}>
                      Services
                    </p>
                    {plan.services.map((service: any, serviceIndex: number) => (
                      <div key={serviceIndex} className="flex gap-[8px] mb-2">
                        <FaCheck className="text-green-500 w-4 h-4 mt-[2px]" />
                        <p className={`${tertiaryTextColor} text-[14px] line-clamp-2`}>
                          Service 1
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className={tertiaryTextColor}>
            No coaching services yet.
          </p>
        )}
      </div>

      {showEditCoachingPlan && (
        <EditCoachingPlanModal 
          servicesList={servicesList}
          setServicesList={setServicesList}
          onClose={() => setShowEditCoachingPlan(false)}
        />
      )}
    </FormContainer>
  );
};