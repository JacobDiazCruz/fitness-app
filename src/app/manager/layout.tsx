'use client'

import Sidebar from "@/components/manager/Sidebar";
import Header from "@/app/manager/Header"
import TextField from "@/components/global/TextField";
import AutoComplete from "@/components/global/AutoComplete";
import Alert from "@/components/global/Alert";
import Providers from "@/utils/provider";
import WelcomePopup from "./WelcomePopup";

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
      <div className="flex bg-white">
        <Sidebar />
        <Alert />
        <WelcomePopup />
        <div className="w-full p-10 height-[100vh]">
          {children}
        </div>
      </div>
    </Providers>
  );
}