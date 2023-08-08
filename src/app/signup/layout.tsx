'use client';

import AppContextProvider from "@/store";
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