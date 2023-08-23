'use client'

import Sidebar from "@/components/manager/Sidebar";
import Alert from "@/components/global/Alert";
import Providers from "@/utils/provider";
import AppContextProvider from "@/store";
import WelcomePopup from "./WelcomePopup";
import MobileTopbar from "@/components/manager/MobileTopbar";
import ThemeWrapper from "./ThemeWrapper";
import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import VerifyUser from "./VerifyUser";
import MessageContextProvider from "@/store/Message";
import SidebarProvider from "@/store/Sidebar/useSidebar";
import Notifications from "@/components/global/Notifications";
import WorkoutTodayAlert from "@/components/global/WorkoutTodayAlert";
import ClientReviewModal from "@/components/global/ClientReviewModal";

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
              <Notifications />
              <WelcomePopup />
              <Alert />
              <ClientReviewModal />
              {/* <WorkoutTodayAlert /> */}
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