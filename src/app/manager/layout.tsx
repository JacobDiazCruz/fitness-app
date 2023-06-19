'use client'

import Sidebar from "@/components/manager/Sidebar";
import Header from "@/app/manager/Header"
import TextField from "@/components/global/TextField";
import AutoComplete from "@/components/global/AutoComplete";
import Alert from "@/components/global/Alert";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";
import WelcomePopup from "./WelcomePopup";
import MobileTopbar from "@/components/manager/MobileTopbar";

export default function ManagerLayout ({
  pageTitle,
  backIcon,
  backPath,
  children
}: {
  pageTitle: string;
  backIcon: boolean;
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <MobileTopbar />
        <div className="flex bg-white">
          <Sidebar />
          <WelcomePopup />
          <Alert />
          <div className="w-full p-10 height-[100vh]">
            {children}
          </div>
        </div>
      </AppContextProvider>
    </Providers>
  );
}