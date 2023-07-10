import AppContextProvider from "@/contexts";
import Providers from "@/utils/provider";
import { ReactNode } from "react";

export default function CheckoutLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </Providers>
  );
};