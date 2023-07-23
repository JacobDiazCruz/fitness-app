import { useState } from "react";
import FormContainer from "../FormContainer";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { LuPackage } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import IconButton from "@/components/global/IconButton";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import EditCoachingPlanModal from "./EditCoachingPlanModal";
import AddCoachingPlanModal from "./AddCoachingPlanModal";
import { useMutation, useQuery } from "react-query";
import { deleteCoachingPlan, listCoachingPlans } from "@/api/CoachingPlan";
import useCoachingPlan from "@/contexts/CoachingPlan/useCoachingPlan";
import { CoachingPlanFormProvider } from "@/contexts/CoachingPlan/useCoachingPlanForm";
import CoachingServiceContextProvider from "@/contexts/CoachingService";

export default function CoachingPlans() {
  const {
    showEditCoachingPlan,
    showAddCoachingPlan,
    setShowEditCoachingPlan,
    setShowAddCoachingPlan
  }: any = useCoachingPlan();

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // list coaching plans
  const {
    data: coachingPlans,
    refetch: refetchCoachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const deleteCoachingPlanMutation = useMutation(deleteCoachingPlan, {
    onSuccess: async () => {
      refetchCoachingPlans();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <FormContainer
      formTitle="Coaching Plans"
      formIcon={<LuPackage className={`${secondaryTextColor} w-7 h-7 m-auto`}/>}
      formDescription="Each plan consists of many services."
      handleAdd={() => setShowAddCoachingPlan(true)}
    >
      <div className="mt-5 flex flex-wrap gap-[20px]">
        {coachingPlans?.length ? (
          <>
            {coachingPlans.map((plan: any, index: number) => (
              <div key={index} className={`${borderColor} py-5 w-[330px] overflow-hidden border p-6 rounded-lg`}>
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
                        onClick={() => {
                          setShowEditCoachingPlan(true);
                          setSelectedPlanId(plan._id);
                        }}
                      >
                        <HiOutlinePencil className={`${secondaryTextColor}`} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteCoachingPlanMutation.mutateAsync(plan._id)
                        }}
                      >
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
                          {service.title}
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
            No coaching plans yet.
          </p>
        )}
      </div>

      {showEditCoachingPlan && (
        <CoachingServiceContextProvider>
          <CoachingPlanFormProvider>
            <EditCoachingPlanModal 
              selectedPlanId={selectedPlanId}
              onClose={() => setShowEditCoachingPlan(false)}
            />
          </CoachingPlanFormProvider>
        </CoachingServiceContextProvider>
      )}

      {showAddCoachingPlan && (
        <CoachingServiceContextProvider>
          <CoachingPlanFormProvider>
            <AddCoachingPlanModal
              onClose={() => setShowAddCoachingPlan(false)}
            />
          </CoachingPlanFormProvider>
        </CoachingServiceContextProvider>
      )}
    </FormContainer>
  );
};