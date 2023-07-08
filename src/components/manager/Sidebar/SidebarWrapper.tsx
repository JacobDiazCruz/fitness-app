import React, { ReactNode } from "react";
import {
  borderColor,
} from "@/utils/themeColors";
import { useSidebar } from "@/contexts/Sidebar/useSidebar";

interface SidebarWrapperProps {
  children: ReactNode;
};

export default function SidebarWrapper ({
  children
}: SidebarWrapperProps) {
  const {
    openNav,
    showSidebar,
    setShowSidebar
  }: any = useSidebar();

  if(showSidebar) {
    return (
      <>
        <div
          className="fixed md:hidden lg:hidden inset-0 w-full h-full dark:dark:bg-neutral-600 bg-darkTheme-950 opacity-70 z-[600]"
          onClick={() => setShowSidebar(false)}
        ></div>
        <div 
          className={`
            sidebar
            dark:bg-darkTheme-900 bg-[#f7f7f7]
            ${openNav ? 'w-[270px]' : 'w-[85px]'}
            ${borderColor}
            h-[100vh] border-r border-r-solid top-0
            md:sticky 
            absolute
            z-[600]
          `}
        >
          {children}
        </div>
      </>
    );
  }
  return <></>;
}