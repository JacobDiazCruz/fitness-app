import AppContextProvider from "@/contexts";
import { ThemeProvider } from "@/contexts/Theme";
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AppContextProvider>
    </Providers>
  );
};