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
import SidebarProvider from "@/contexts/Sidebar/useSidebar";

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