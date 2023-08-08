import SidebarWrapper from "./SidebarWrapper";

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <SidebarWrapper.LogoWrapper />
      <SidebarWrapper.ToggleButton />
      <SidebarWrapper.BasicNavItems />
      <SidebarWrapper.FitnessNavItems />
      {/* <SidebarSessionDetails /> */}
      <SidebarWrapper.ActionButtons />
      <SidebarWrapper.UserMenu />
    </SidebarWrapper>
  );
};