'use client'

import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import ThemeWrapper from "@/app/manager/ThemeWrapper";
import HomeLayout from "@/layouts/HomeLayout";

export default function CoachLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <DarkThemeLoader />
        <ThemeWrapper>
          <HomeLayout>
            {children}
          </HomeLayout>
        </ThemeWrapper>
      </AppContextProvider>
    </Providers>
  );
}