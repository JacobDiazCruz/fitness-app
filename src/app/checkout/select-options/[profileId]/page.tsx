'use client';

import React, { useEffect, useState } from "react";
import SelectOrderOptions from "../../SelectOrderOptions";
import CheckoutContainer from "../../CheckoutContainer";
import Steps from "../../Steps";
import { ThemeProvider } from "@/contexts/Theme";
import { useQuery } from "react-query";
import { getCoachingServices } from "@/api/CoachingService";
import { useParams } from "next/navigation";

export default function Checkout() {
  const params = useParams();
  const [orderOptions, setOrderOptions] = useState([]);
  const [coachingPlans, setCoachingPlans] = useState([
    {
      label: "4 weeks plan",
      isSelected: false,
      price: {
        currency: "PHP",
        value: 50
      },
      description: "Good for clients why wants to try a coach's service for a day.",
      type: "30_DAYS"
    },
    {
      label: "1 day plan",
      isSelected: false,
      price: {
        currency: "PHP",
        value: 500
      },
      description: "Good for clients why wants to try a coach's service for a day.",
      type: "1_DAY"
    }
  ]);

  // get exercise data
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