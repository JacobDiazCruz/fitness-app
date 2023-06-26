'use client';

import AppContextProvider from "@/contexts";
import Providers from "@/utils/provider";

export default function SignupLayout({
  children
}) {
  return (
    <Providers>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </Providers>
  );
};