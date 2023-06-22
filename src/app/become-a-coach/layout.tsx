'use client'

import { ReactNode } from "react";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";

export default function Layout({
  children
}) {
  return (
    <Providers>
      <AppContextProvider>
        <DarkThemeLoader />
        {children}
      </AppContextProvider>
    </Providers>
  );
}