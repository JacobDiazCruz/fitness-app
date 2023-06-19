import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import UserMenu from '../global/UserMenu';
import { CalendarIcon, ChatIcon, DoubleUserIcon, DumbbellIcon, RectangleGroupIcon, SettingsIcon, ShoppingBagIcon } from "../global/Icons";
import useTheme from "@/contexts/Theme";
import useDarkTheme from "@/hooks/useDarkTheme";

export default function Sidebar () {
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode } = useTheme();
  const { borderColor, primaryBgColor, secondaryBgColor } = useDarkTheme();

  const [openNav, setOpenNav] = useState(true);
  const [navItems, setNavItems] = useState([
    {
      icon: <DoubleUserIcon className="w-6 h-6 text-gray-400" />,
      name: "Clients",
      path: "/manager/clients"
    },
    {
      icon: <ChatIcon className="w-6 h-6 text-gray-400" />,
      name: "Messages",
      path: "/manager/messages"
    },
    {
      icon: <ShoppingBagIcon className="w-6 h-6 text-gray-400" />,
      name: "Coaches",
      path: "/manager/coaches"
    },
    {
      icon: <SettingsIcon className="w-6 h-6 text-gray-400" />,
      name: "Account Settings",
      path: "/manager/profile"
    }
  ]);

  const [fitnessNavItems, setFitnessNavItems] = useState([
    {
      icon: <DumbbellIcon className="w-6 h-6 fill-[#90959A]" />,
      name: "Exercises",
      path: "/manager/exercises"
    },
    {
      icon: <RectangleGroupIcon className="w-6 h-6 text-gray-400" />,
      name: "Workouts",
      path: "/manager/workouts"
    },
    {
      icon: <CalendarIcon className="w-6 h-6 text-gray-400" />,
      name: "Programs",
      path: "/manager/programs"
    }
  ]);

  const ToggleButton = () => {
    return (
      <div
        onClick={() => setOpenNav(!openNav)}
        className={`
          ${borderColor}
          ${primaryBgColor}
          ${openNav ? 'ml-[215px]' : 'ml-[60px]'} 
          shadow-md rounded-full w-[35px] h-[35px] flex border border-solid cursor-pointer z-[100] absolute
        `}
      >
        {openNav ? (
          <svg t="1685329522863" className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4186" width="18" height="18"><path d="M268.8 480L633.6 149.333333c17.066667-14.933333 44.8-14.933333 59.733333 2.133334 6.4 8.533333 10.666667 19.2 10.666667 29.866666v661.333334c0 23.466667-19.2 42.666667-42.666667 42.666666-10.666667 0-21.333333-4.266667-27.733333-10.666666l-362.666667-330.666667c-17.066667-14.933333-19.2-42.666667-2.133333-59.733333-2.133333-2.133333 0-2.133333 0-4.266667z" fill="#666666" p-id="4187"></path></svg>
        ) : (
          <svg t="1685329505482" className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3213" width="18" height="18"><path d="M755.2 544L390.4 874.666667c-17.066667 14.933333-44.8 14.933333-59.733333-2.133334-6.4-8.533333-10.666667-19.2-10.666667-29.866666v-661.333334c0-23.466667 19.2-42.666667 42.666667-42.666666 10.666667 0 21.333333 4.266667 27.733333 10.666666l362.666667 330.666667c17.066667 14.933333 19.2 42.666667 2.133333 59.733333 2.133333 2.133333 0 2.133333 0 4.266667z" fill="#666666" p-id="3214"></path></svg>
        )}
      </div>
    );
  };

  const List = ({ path, name, icon }) => {
    const isActive = pathname.startsWith(path);

    return (
      <li
        className={`
          ${(isActive && darkMode) && 'bg-neutral-800 '} 
          ${(isActive && !darkMode) && 'bg-[#eeeeee]'}
          ${darkMode ? 'hover:bg-neutral-900' : 'hover:bg-[#f2f2f2]'}
          rounded-lg group relative cursor-pointer px-3 py-2
        `}
        onClick={() => router.push(path)}
        key={name}
      >
        <div className="flex items-center">
          {icon}
          {openNav && (
            <p
              className={`
                ${(isActive && darkMode) ? "text-white font-medium" : "text-[#898995]"}
                ${(isActive && !darkMode) ? 'text-[#24282C] font-medium' : 'text-[#898995]'} 
                font-light ml-4 text-[12px]
              `}
            >
              {name}
            </p>
          )}
        </div>
        {!openNav && (
          <span className="absolute z-100 scale-0 left-20 top-5 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            {name}
          </span>
        )}
      </li>
    );
  }

  return (
    <div className={`
      ${darkMode ? "bg-black" : "bg-[#f7f7f7]"} 
      ${openNav ? 'w-[270px]' : 'w-[85px]'}
      ${borderColor}
      h-[100vh] border-r border-r-solid sticky top-0`
      }
    >
      <div className="px-6 pt-8">
        <div className="bg-[#495dff] w-[40px] h-[40px] rounded-lg flex items-center shadow-md">
          <div className="m-auto text-white font-medium">L.</div>
        </div>
      </div>
      <hr className={`${borderColor} mt-6 absolute w-full`} />
      <ToggleButton />
      <ul className="pt-9 pb-3 px-3">
        {navItems.map((item, key) => {
          return (
            <List
              key={key}
              path={item.path}
              name={item.name}
              icon={item.icon}
            />
          )
        })}
      </ul>
      <hr className={borderColor}/>
      <ul className="pb-3 px-3 pt-6">
        {openNav && (
          <p className="text-[13px] text-[#898995] px-3 mb-1">
            Fitness
          </p>
        )}
        {fitnessNavItems.map((item, key) => {
          return (
            <List
              key={key}
              path={item.path}
              name={item.name}
              icon={item.icon}
            />
          )
        })}
      </ul>

      {/* User Menu */}
      <div className={`
        ${primaryBgColor}
        absolute bottom-0 w-full`}
      >
        <hr className={borderColor} />
        <div className="pb-6 pt-4 px-5">
          <UserMenu
            openNav={openNav}
            showTop={true}
          />
        </div>
      </div>

      {/* {openNav && (
        <div className="rounded-xl bg-[#24282C] w-[85%] mx-auto mt-5 p-5">
          <h4 className="font-medium text-white">How to use</h4>
          <p className="text-[#A8AAAE] mt-1 text-[14px]">Get more clients by purchasing our latest AI client finder</p>
          <div className="bg-[#D3F26C] rounded-full w-full h-[40px] mt-5 text-center flex flex-center">
            <div className="text-center m-auto">Coming soon</div>
          </div>
        </div>
      )} */}
    </div>
  );
}