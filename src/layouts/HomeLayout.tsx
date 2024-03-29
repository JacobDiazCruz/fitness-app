'use client';

import Navbar from "@/components/global/Navbar";
import Providers from "@/utils/provider";
import AppContextProvider from "@/store";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function HomeLayout({ 
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  return (
    <Providers>
      <AppContextProvider>
        <DarkThemeLoader />
        <Navbar />
        <div className="dark:bg-darkTheme-950 bg-[#F8F8F8]">
          <div className="dark:bg-darkTheme-950 bg-[#F8F8F8] mx-auto xl:w-[1300px] 2xl:w-[1450px]">
            {children}
          </div>
        </div>
      </AppContextProvider>
    </Providers>
  );
}