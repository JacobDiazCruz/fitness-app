import { useSidebar } from "@/store/Sidebar/useSidebar";
import SidebarSessionDetails from "./SidebarSessionDetails";
import SidebarWrapper from "./SidebarWrapper";

export default function Sidebar() {
  const { openNav } = useSidebar();

  return (
    <SidebarWrapper>
      <SidebarWrapper.LogoWrapper />
      <SidebarWrapper.ToggleButton />
      <SidebarWrapper.BasicNavItems />
      <SidebarWrapper.FitnessNavItems />
      {openNav && (
        <SidebarSessionDetails />
      )}
      <SidebarWrapper.ActionButtons />
      <SidebarWrapper.UserMenu />
    </SidebarWrapper>
  );
};