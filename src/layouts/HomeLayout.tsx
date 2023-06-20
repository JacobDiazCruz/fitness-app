'use client';
import Navbar from "@/components/global/Navbar";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";

export default function HomeLayout({ 
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <DarkThemeLoader />
        <Navbar />
        <div className="dark:bg-black bg-[#F8F8F8]">
          <div className="dark:bg-black bg-[#F8F8F8] py-[100px] mx-auto xl:w-[1300px] 2xl:w-[1450px]">
            {children}
          </div>
        </div>
      </AppContextProvider>
    </Providers>
  );
}