import PermissionAccess from "@/components/global/PermissionAccess";
import { useSidebar } from "@/store/Sidebar/useSidebar";
import NavItem from "./NavItem";

export default function SidebarBasicNavItems() {
  const { basicNavItems }: any = useSidebar();

  return (
    <ul className="pt-9 pb-5 px-3">
      {basicNavItems.map((item: any, index: number) => {
        return (
          <PermissionAccess roleAccess={item?.roleAccess}>
            <NavItem
              index={index}
              path={item.path}
              name={item.name}
              icon={item.icon}
            />
          </PermissionAccess>
        );
      })}
    </ul>
  );
};