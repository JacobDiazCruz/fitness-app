'use client';

import React, { useEffect, useState } from "react";
import SelectOrderOptions from "../../SelectOrderOptions";
import CheckoutContainer from "../../CheckoutContainer";
import Steps from "../../Steps";
import { ThemeProvider } from "@/contexts/Theme";
import { useQuery } from "react-query";
import { getCoachingServices } from "@/api/CoachingService";
import { useParams } from "next/navigation";
import { listCoachingPlans } from "@/api/CoachingPlan";

export default function Checkout() {
  const params = useParams();
  const [orderOptions, setOrderOptions] = useState([]);

  // list coaching plans
  const {
    data: coachingPlans
  } = useQuery('coachingPlans', () => listCoachingPlans(localStorage.getItem("userId") ?? ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

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
          orderOptions={orderOptions}
          coachingPlans={coachingPlans}
          setOrderOptions={setOrderOptions}
        />
        <CheckoutContainer
          orderOptions={orderOptions}
        />
      </div>
    </div>
  );
}