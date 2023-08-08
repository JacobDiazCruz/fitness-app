'use client';

import { useSidebar } from "@/store/Sidebar/useSidebar";
import { secondaryBgColor } from "@/utils/themeColors";
import IconButton from "../global/IconButton";
import { HamburgerIcon } from "../global/Icons";

export default function MobileTopbar() {
  const { setShowSidebar }: any = useSidebar();
  return (
    <div className={`${secondaryBgColor} md:hidden w-full top-0 sticky z-[500] h-[50px] flex items-center dark:shadow-none shadow-md`}>
      <div className="flex ml-2">
        <IconButton onClick={() => setShowSidebar(true)}>
          <HamburgerIcon className="w-5 h-5"/>
        </IconButton>
      </div>
    </div>
  );
};