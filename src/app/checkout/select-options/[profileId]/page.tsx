'use client';

import React, { useEffect, useState } from "react";
import SelectOrderOptions from "../../SelectOrderOptions";
import CheckoutContainer from "../../CheckoutContainer";
import Steps from "../../Steps";
import { ThemeProvider } from "@/contexts/Theme";
import { useQuery } from "react-query";
import { getCoachingServices } from "@/api/CoachingService";
import { useParams, useSearchParams } from "next/navigation";
import { listCoachingPlans } from "@/api/CoachingPlan";
import CheckoutModal from "../../CheckoutModal";

export default function Checkout() {
  const params = useParams();
  const searchParams = useSearchParams();
  const urlPlanId = searchParams.get("plan");

  const [orderOptions, setOrderOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // list coaching plans
  const {
    data: coachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    if(coachingPlans) {
      const plan = coachingPlans.find((plan: any) => plan._id === urlPlanId);
      setSelectedPlan(plan);
    }
  }, [coachingPlans]);

  const {
    data: coachingServices,
  } = useQuery('coachingServices', () => getCoachingServices(params.profileId), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    setOrderOptions(coachingServices);
  }, [coachingServices]);

  return (
    <div
      style={{
        margin: "100px auto",
        width: '1200px'
      }}
    >
      <Steps />
      <div
        style={{
          display: "flex",
          gap: "30px",
          margin: "50px auto",
          width: '1200px'
        }}
      >
        <SelectOrderOptions
          selectedPlan={selectedPlan}
          orderOptions={orderOptions}
          coachingPlans={coachingPlans}
          setOrderOptions={setOrderOptions}
        />
        <CheckoutContainer
          selectedPlan={selectedPlan}
          orderOptions={orderOptions}
        />
      </div>
    </div>
  );
};