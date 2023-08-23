import { useSidebar } from "@/store/Sidebar/useSidebar";
import SidebarSessionDetails from "./SidebarSessionDetails";
import SidebarWrapper from "./SidebarWrapper";

export default function Sidebar() {
  const { openNav }: any = useSidebar();
  const isClientRole = localStorage.getItem("userRole") === "Client";

  return (
    <SidebarWrapper>
      <SidebarWrapper.LogoWrapper />
      <SidebarWrapper.ToggleButton />
      <SidebarWrapper.BasicNavItems />
      <SidebarWrapper.FitnessNavItems />
      {(openNav && isClientRole) && (
        <SidebarSessionDetails />
      )}
      <SidebarWrapper.ActionButtons />
      <SidebarWrapper.UserMenu />
    </SidebarWrapper>
  );
};