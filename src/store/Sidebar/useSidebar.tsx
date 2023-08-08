import React, { createContext, ReactNode, useContext, useState } from "react";
import { DoubleUserIcon, RectangleGroupIcon, SettingsIcon, ShoppingBagIcon } from "@/components/global/Icons";
import SidebarChatWrapper from "@/components/manager/Sidebar/SidebarChatWrapper";
import { BsCalendarWeek } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { LuDumbbell } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

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
  const profileId = localStorage.getItem("profileId");
  
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
      name: "Orders",
      path: "/manager/orders",
      roleAccess: "Client"
    },
    {
      icon: <LiaChalkboardTeacherSolid className="w-6 h-6 text-gray-400" />,
      name: "Coaches",
      path: "/manager/coaches",
      roleAccess: "All"
    },
    {
      icon: <SettingsIcon className="w-6 h-6 text-gray-400" />,
      name: "Profile",
      path: `/manager/profile/${profileId}`,
      roleAccess: "All"
    },
    {
      icon: <BsCalendarWeek className="w-6 h-5 text-gray-400" />,
      name: "Calendar",
      path: `/manager/calendar`,
      roleAccess: "All"
    }
  ]);

  const [fitnessNavItems] = useState([
    {
      icon: <LuDumbbell className="w-6 h-6 text-gray-400" />,
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
      icon: <AiOutlineSchedule className="w-6 h-6 text-gray-400" />,
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