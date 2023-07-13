'use client'

import Sidebar from "@/components/manager/Sidebar";
import Alert from "@/components/global/Alert";
import Providers from "@/utils/provider";
import AppContextProvider from "@/contexts";
import WelcomePopup from "./WelcomePopup";
import MobileTopbar from "@/components/manager/MobileTopbar";
import ThemeWrapper from "./ThemeWrapper";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import VerifyUser from "./VerifyUser";
import MessageContextProvider from "@/contexts/Message";
import SidebarProvider from "@/contexts/Sidebar/useSidebar";
import { useEffect } from "react";

export default function ManagerLayout ({
  children
}: {
  children: React.ReactNode
}) {
  
  return (
    <Providers>
      <AppContextProvider>
        <MessageContextProvider>
          <SidebarProvider>
            <VerifyUser />
            <MobileTopbar />
            <DarkThemeLoader />
            <div className="flex">
              <Sidebar />
              <WelcomePopup />
              <Alert />
              <ThemeWrapper>
                {children}
              </ThemeWrapper>
            </div>
          </SidebarProvider>
        </MessageContextProvider>
      </AppContextProvider>
    </Providers>
  );
}