'use client';

import Navbar from "@/components/global/Navbar";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";

export default function HomeLayout({ 
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <Navbar />
        <DarkThemeLoader />
        <div className="my-[100px] mx-auto w-[1250px] xl:w-[1300px] 2xl:w-[1450px]">
          {children}
        </div>
      </AppContextProvider>
    </Providers>
  );
}