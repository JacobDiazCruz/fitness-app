import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import UserMenu from '../global/UserMenu';
import { ArrowRightIcon, CalendarIcon, ChatIcon, DoubleUserIcon, DumbbellIcon, RectangleGroupIcon, SettingsIcon, ShoppingBagIcon } from "../global/Icons";
import useTheme from "@/contexts/Theme";
import {
  borderColor,
  primaryBgColor,
  primaryTextColor,
  secondaryBgColor,
  secondaryTextColor,
  tertiaryBgColor
} from "@/utils/themeColors";
import useChatNotif from "@/hooks/messages/useChatNotif";
import Button from "../global/Button";
import useLocalStorage from "@/hooks/useLocalStorage";

const ChatIconWrapper = () => {
  const { chatNotifData } = useChatNotif();
  return (
    <div className="relative">
      {chatNotifData?.receiverId && (
        <div className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-0 top-0"></div>
      )}
      <ChatIcon className="w-6 h-6 text-gray-400" />
    </div>
  );
}

export default function Sidebar () {
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode } = useTheme();
  const userRole = useLocalStorage("userRole");

  const [openNav, setOpenNav] = useState(true);
  const [navItems, setNavItems] = useState([
    {
      icon: <DoubleUserIcon className="w-6 h-6 text-gray-400" />,
      name: "Clients",
      path: "/manager/clients"
    },
    {
      icon: <ChatIconWrapper />,
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
          shadow-md rounded-full right-[-15px] w-[35px] h-[35px] flex border border-solid cursor-pointer z-[100] absolute
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
      ${darkMode ? "bg-neutral-950" : "bg-[#f7f7f7]"} 
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
        dark:bg-neutral-950
        bg-[#f7f7f7]
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

      {/* {(openNav && userRole == 1) && (
        <div className="dark:bg-neutral-800 bg-neutral-200 rounded-xl w-[85%] mx-auto mt-5 p-5">
          <h4 className={`${primaryTextColor} font-medium`}>
            Become a coach
          </h4>
          <p className={`${secondaryTextColor} mt-1 text-[14px]`}>
            Become an online coach and get reviews from your clients
          </p>
          <Button
            variant="special"
            className="w-full mt-4"
            onClick={() => router.push('/become-a-coach')}
            endIcon={<ArrowRightIcon className={`text-white w-4 h-4 mt-[2px]`}/>}
          >
            Start now
          </Button>
        </div>
      )} */}
    </div>
  );
}