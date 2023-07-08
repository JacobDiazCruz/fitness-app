import UserMenu from "@/components/global/UserMenu";
import { useSidebar } from "@/contexts/Sidebar/useSidebar";
import { borderColor } from "@/utils/themeColors";

export default function SidebarUserMenu() {
  const { openNav }: any = useSidebar();
  return (
    <div className="dark:bg-darkTheme-900 bg-[#f7f7f7] absolute bottom-0 w-full">
      <hr className={borderColor} />
      <div className="pb-6 pt-4 px-5">
        <UserMenu
          openNav={openNav}
          showTop={true}
        />
      </div>
    </div>
  );
}