'use client'

import Providers from "@/utils/provider";
import AppContextProvider from "@/store";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import ThemeWrapper from "@/app/manager/ThemeWrapper";
import HomeLayout from "@/layouts/HomeLayout";
import { CoachingServiceProvider } from "@/store/CoachingService/useCoachingService";
import CoachingPlanContextProvider from "@/store/CoachingPlan";

export default function CoachLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <CoachingServiceProvider>
          <CoachingPlanContextProvider>
            <DarkThemeLoader />
            <ThemeWrapper>
              <HomeLayout>
                {children}
              </HomeLayout>
            </ThemeWrapper>
          </CoachingPlanContextProvider>
        </CoachingServiceProvider>
      </AppContextProvider>
    </Providers>
  );
}