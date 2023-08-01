'use client';

import CoachDetails from "@/components/global/CoachDetails";
import CoachingPlanContextProvider from "@/contexts/CoachingPlan";
import { CoachingServiceProvider } from "@/contexts/CoachingService/useCoachingService";

export default function Coach() {
  return (
    <CoachingServiceProvider>
      <CoachingPlanContextProvider>
        <CoachDetails />
      </CoachingPlanContextProvider>
    </CoachingServiceProvider>
  );
}