import { listCoachingPlans } from "@/api/CoachingPlan";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";

const CoachingPlanContext = createContext(null);

export const CoachingPlanProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [showEditCoachingPlan, setShowEditCoachingPlan] = useState<boolean>(false);
  const [showAddCoachingPlan, setShowAddCoachingPlan] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // list coaching plans
  const {
    isLoading: isLoadingCoachingPlans,
    data: coachingPlans,
    refetch: refetchCoachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const value = {
    coachingPlans,
    showEditCoachingPlan,
    setShowEditCoachingPlan,
    setShowAddCoachingPlan,
    showAddCoachingPlan,
    isLoadingCoachingPlans,
    refetchCoachingPlans,
    selectedPlan,
    setSelectedPlan
  };

  return (
    <CoachingPlanContext.Provider value={value}>
      {children}
    </CoachingPlanContext.Provider>
  );
};

const useCoachingPlan = () => {
  const context = useContext(CoachingPlanContext)
  if (context === undefined) {
    throw new Error("useCoachingPlan must be used within the CoachingPlanContext context")
  }
  return context;
};

export default useCoachingPlan;