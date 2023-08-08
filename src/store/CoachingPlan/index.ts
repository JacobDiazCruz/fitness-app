'use client';

import { combineComponents } from "@/utils/combineComponents"
import { CoachingPlanProvider } from "./useCoachingPlan";
import { CoachingPlanFormProvider } from "./useCoachingPlanForm";

const providers = [
  CoachingPlanProvider,
  CoachingPlanFormProvider
];

const CoachingPlanContextProvider = combineComponents(...providers);
export default CoachingPlanContextProvider;