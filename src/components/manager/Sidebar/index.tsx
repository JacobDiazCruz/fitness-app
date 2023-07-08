import SidebarWrapper from "./SidebarWrapper";
import SidebarToggleButton from "./SidebarToggleButton";
import SidebarBasicNavItems from "./SidebarBasicNavItems";
import SidebarFitnessNavItems from "./SidebarFitnessNavItems";
import SidebarUserMenu from "./SidebarUserMenu";
import SidebarLogoWrapper from "./SidebarLogoWrapper";

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <SidebarLogoWrapper />
      <SidebarToggleButton />
      <SidebarBasicNavItems />
      <SidebarFitnessNavItems />
      <SidebarUserMenu />
    </SidebarWrapper>
  );
};