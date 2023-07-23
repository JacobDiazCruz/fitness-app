'use client';

import { combineComponents } from "@/utils/combineComponents"
import { CoachingServiceProvider } from "./useCoachingService";

const providers = [
  CoachingServiceProvider,
];

const CoachingServiceContextProvider = combineComponents(...providers);
export default CoachingServiceContextProvider;