'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from "./UserMenu";
import Button from "./Button";
import Link from "next/link";
import Providers from "@/utils/provider";
import useLocalStorage from "@/hooks/useLocalStorage";
import LoginGoogle from "./LoginGoogle";
import IconButton from "./IconButton";
import { ChatIcon } from "./Icons";
import { primaryTextColor } from "@/utils/themeColors";

export default function Navbar() {
  const router = useRouter();
  const accessToken = useLocalStorage("accessToken");
  const userRole = useLocalStorage("userRole");

  return (
    <Providers>
      <div className="dark:bg-black bg-[#F8F8F8]">
        <div className="w-full dark:bg-black bg-[#F8F8F8] xl:w-[1300px] 2xl:w-[1450px] m-auto">
          <div className="py-6 flex items-center justify-between">
            <h2>Logo</h2>
            {accessToken ? (
              <div className="flex items-center">
                {userRole == 1 && (
                  <Link href="/become-a-coach">
                    <Button variant="outlined mr-5">
                      Become a Coach
                    </Button>
                  </Link>
                )}
                <Link href="/messages">
                  <IconButton className="bg-gray-200 w-[35px] p-1.5 mr-4 h-[35px] flex items-center relative">
                    <div className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-0 top-0"></div>
                    <ChatIcon className="w-7 h-7 text-gray-700"/>
                  </IconButton>
                </Link>
                <UserMenu />
              </div>
            ) : (
              <div>
                <Link href="/signup/role" className={primaryTextColor}>
                  <Button>
                    Join now
                  </Button>
                </Link>
                <Link href="/signin" className={primaryTextColor}>
                  <Button variant="outlined">
                    Sign in
                  </Button>
                </Link>
                {/* <LoginGoogle /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Providers>
  );
}