'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ArrowUpDownIcon, DropdownIcon } from "./Icons";
import { useMutation } from "react-query";
import { logoutUser } from "@/api/User";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import Switch from "./Switch";
import useTheme from "@/contexts/Theme";
import useDarkTheme from "@/hooks/useDarkTheme";

export default function UserMenu({
  openNav,
  showTop = false
}) {
  const router = useRouter();
  const { secondaryBgColor } = useDarkTheme();
  const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setOpenUserDropdown(false));
  const [accessToken, setAccessToken] = useState("");
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  // logout request
  const logoutMutation = useMutation(logoutUser, {
    onSuccess: (data) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("email");
      router.push('/signin')
    },
    onError: (err) => {
      console.log(err)
    }
  });

  const DropdownMenu = () => {
    return (
      <div 
        className={`
          ${showTop && 'bottom-20'}
          ${secondaryBgColor}
          dark:border-neutral-700
          border border-solid
          dropdown w-[250px] absolute z-[999] shadow-md rounded-md`
        }
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownDefaultButton">
          <li 
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 flex items-center gap-[10px]"
            onClick={() => router.push('/manager/profile')}
          >
            <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div>
              <p className="dark:text-neutral-200 text-gray-900 text-[14px] text-gray-800 font-medium">
                John Doe
              </p>
              <p className="dark:text-neutral-200 text-gray-900 text-[12px] text-gray-500 font-light">
                johndoe@gmail.com
              </p>
            </div>
          </li>
          <hr className="my-2 dark:border-neutral-700 border-neutral-200" />
          <li className="dark:text-neutral-200 text-gray-900 px-4 py-2 flex items-center justify-between gap-[10px]">
            <div>Public coaching profile</div>
            <Switch />
          </li>
          <li className="dark:text-neutral-200 text-gray-900 block px-4 py-2 flex items-center justify-between gap-[10px]">
            <div>Dark mode</div>
            <Switch 
              value={darkMode}
              handleClick={() => toggleDarkMode()}
            />
          </li>
          <li onClick={() => router.push('/manager/exercises')} className="dark:text-neutral-200 text-gray-900 cursor-pointer">
            <Link 
              href="/manager/profile" 
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900"
            >
              Open Manager
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("accessToken")
              logoutMutation.mutateAsync({ accessToken })
            }}
            className="dark:text-neutral-200 text-gray-900 cursor-pointer"
          >
            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900">
              Sign out
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref} className="user-menu">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setOpenUserDropdown(!openUserDropdown)}
      >
        <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
          <Image
            alt="Trainer Image"
            src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        {openNav && (
          <div>
            <p 
              className={`
                dark:text-neutral-200 text-gray-900
                ml-2 text-[14px] font-medium
              `}
            >
              John Doe
            </p>
            <p
              className={
                `${darkMode ? 'text-gray-400' : 'text-gray-500'}
                ml-2 text-[12px] font-light
              `}
            >
              johndoe@gmail.com
            </p>
          </div>
        )}
        <ArrowUpDownIcon className={`${openNav ? 'relative ml-5' : 'absolute ml-9'} w-5 h-5 text-gray-400`} />
      </div>
      
      {openUserDropdown && (
        <DropdownMenu />
      )}
    </div>
  );
}