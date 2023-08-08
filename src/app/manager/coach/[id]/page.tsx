"use client";

import CoachDetails from "@/components/global/CoachDetails";
import CoachingPlanContextProvider from "@/store/CoachingPlan";
import { CoachingServiceProvider } from "@/store/CoachingService/useCoachingService";

export default function Coach() {
  return (
    <CoachingServiceProvider>
      <CoachingPlanContextProvider>
        <CoachDetails />
      </CoachingPlanContextProvider>
    </CoachingServiceProvider>
  );
}