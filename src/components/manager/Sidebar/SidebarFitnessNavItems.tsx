import PermissionAccess from "@/components/global/PermissionAccess";
import { useSidebar } from "@/store/Sidebar/useSidebar";
import { borderColor } from "@/utils/themeColors";
import NavItem from "./NavItem";

export default function SidebarFitnessNavItems() {
  const { openNav, fitnessNavItems }: any = useSidebar();

  return (
    <ul className={`${borderColor} pt-5 pb-3 px-3 border-t`}>
      {openNav && (
        <p className="text-[13px] text-[#898995] px-3 mb-2">
          Fitness
        </p>
      )}
      {fitnessNavItems.map((item: any, index: number) => {
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