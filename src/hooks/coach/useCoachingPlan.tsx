import { listCoachingPlans } from "@/api/CoachingPlan";
import { useState } from "react";
import { useQuery } from "react-query";

export default function useCoachingPlan() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // list coaching plans
  const {
    isLoading: isLoadingCoachingPlans,
    data: coachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  return {
    coachingPlans,
    isLoadingCoachingPlans,
    selectedPlan,
    setSelectedPlan
  };
};