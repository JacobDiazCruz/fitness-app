'use client'

import { ReactNode } from "react";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";

export default function Layout({
  children
}) {
  return (
    <Providers>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </Providers>
  );
}