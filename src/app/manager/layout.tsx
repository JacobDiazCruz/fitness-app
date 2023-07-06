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
import ThemeWrapper from "./ThemeWrapper";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import { useEffect, useState } from "react";
import VerifyUser from "./VerifyUser";
import MessageContextProvider from "@/contexts/Message";

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
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <Providers>
      <AppContextProvider>
        <MessageContextProvider>
          <VerifyUser />
          <MobileTopbar 
            handleOpenSidebar={() => setShowSidebar(!showSidebar)}
          />
          <DarkThemeLoader />
          <div className="flex">
            {showSidebar && (
              <Sidebar 
                handleCloseSidebar={() => setShowSidebar(false)}
              />
            )}
            <WelcomePopup />
            <Alert />
            <ThemeWrapper>
              {children}
            </ThemeWrapper>
          </div>
        </MessageContextProvider>
      </AppContextProvider>
    </Providers>
  );
}