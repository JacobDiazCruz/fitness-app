'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function UserMenu() {
  const router = useRouter();
  const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setOpenUserDropdown(false));
  const dropdownIcon: SVGAElement = <svg t="1685162255200" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="18" height="18"><path d="M725.333333 426.666667L512 640 298.666667 426.666667z" p-id="2380"></path></svg>;
  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpenUserDropdown(!openUserDropdown)}
        ref={ref}
      >
        <div className="rounded-full w-[40px] h-[40px] relative overflow-hidden">
          <Image
            alt="Trainer Image"
            src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        {/* <p className="text-gray-600 text-[14px]">John Doe</p> */}
        {dropdownIcon}
        {openUserDropdown && (
          <div className="dropdown absolute bg-white mt-[150px] z-50 shadow-md rounded-md">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownDefaultButton">
              <li onClick={() => router.push('/manager/exercises')}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Open Manager</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </> 
  );
}