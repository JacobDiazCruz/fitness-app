'use client';

import { primaryBgColor, secondaryBgColor } from "@/utils/themeColors";
import IconButton from "../global/IconButton";
import { HamburgerIcon } from "../global/Icons";

export default function MobileTopbar({
  handleOpenSidebar
}: {
  handleOpenSidebar: boolean
}) {
  return (
    <div className={`${secondaryBgColor} md:hidden w-full top-0 sticky h-[50px] flex items-center dark:shadow-none shadow-md`}>
      <div className="flex ml-2">
        <IconButton onClick={handleOpenSidebar}>
          <HamburgerIcon className="w-5 h-5"/>
        </IconButton>
      </div>
    </div>
  );
};