'use client';

import { combineComponents } from "@/utils/combineComponents"
import { CoachingServiceProvider } from "./useCoachingService";
import { CoachingServiceFormProvider } from "./useCoachingServiceForm";

const providers = [
  CoachingServiceProvider,
  CoachingServiceFormProvider
];

const CoachingServiceContextProvider = combineComponents(...providers);
export default CoachingServiceContextProvider;