import React, { createContext, ReactNode, useContext, useState } from "react";
import { CalendarIcon, DoubleUserIcon, DumbbellIcon, RectangleGroupIcon, SettingsIcon, ShoppingBagIcon } from "@/components/global/Icons";
import SidebarChatWrapper from "@/components/manager/Sidebar/SidebarChatWrapper";

interface NavItem {
  icon: React.JSX.Element; 
  name: string; 
  path: string;
};

const SidebarContext = createContext<{
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
  basicNavItems: NavItem[];
  fitnessNavItems: NavItem[];
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export default function SidebarProvider ({
  children
}: {
  children: ReactNode
}) {

  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [openNav, setOpenNav] = useState(true);
  const [basicNavItems] = useState([
    {
      icon: <DoubleUserIcon className="w-6 h-6 text-gray-400" />,
      name: "Clients",
      path: "/manager/clients",
      roleAccess: "Coach"
    },
    {
      icon: <SidebarChatWrapper />,
      name: "Messages",
      path: "/manager/messages",
      roleAccess: "All"
    },
    {
      icon: <ShoppingBagIcon className="w-6 h-6 text-gray-400" />,
      name: "Coaches",
      path: "/manager/coaches",
      roleAccess: "All"
    },
    {
      icon: <SettingsIcon className="w-6 h-6 text-gray-400" />,
      name: "Account Settings",
      path: "/manager/profile",
      roleAccess: "All"
    }
  ]);

  const [fitnessNavItems] = useState([
    {
      icon: <DumbbellIcon className="w-6 h-6 fill-[#90959A]" />,
      name: "Exercises",
      path: "/manager/exercises",
      roleAccess: "All"
    },
    {
      icon: <RectangleGroupIcon className="w-6 h-6 text-gray-400" />,
      name: "Workouts",
      path: "/manager/workouts",
      roleAccess: "All"
    },
    {
      icon: <CalendarIcon className="w-6 h-6 text-gray-400" />,
      name: "Programs",
      path: "/manager/programs",
      roleAccess: "All"
    }
  ]);

  // value prop to return all necessary data
  const value = {
    openNav,
    setOpenNav,
    showSidebar,
    setShowSidebar,
    basicNavItems,
    fitnessNavItems,
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within sidebar context")
  }
  return context;
};