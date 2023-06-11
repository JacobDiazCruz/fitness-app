'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { DropdownIcon } from "./Icons";
import { useMutation } from "react-query";
import { logout } from "@/api/User";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function UserMenu() {
  const router = useRouter();
  const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setOpenUserDropdown(false));
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  // logout request
  const { mutate, isLoading } = useMutation({
    mutationFn: (req: any) => logout(req),
      onSuccess: (res: any) => {
        localStorage.removeItem("accessToken");
        router.push('/')
      },
      onError: (e) => {
        console.log(e);
      }
  });

  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpenUserDropdown(!openUserDropdown)}
        ref={ref}
      >
        <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
          <Image
            alt="Trainer Image"
            src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <DropdownIcon className="w-4 h-4 absolute ml-9" />
        {openUserDropdown && (
          <div className="dropdown w-[150px] absolute z-[999] bg-white mt-[150px] shadow-md rounded-md">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownDefaultButton">
              <li onClick={() => router.push('/manager/exercises')}>
                <a href="/manager/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100">Open Manager</a>
              </li>
              <li onClick={() => mutate({ accessToken })}>
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100">
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </> 
  );
}