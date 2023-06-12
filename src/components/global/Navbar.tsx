'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from "./UserMenu";
import Button from "./Button";
import Link from "next/link";
import Providers from "@/utils/provider";
import useLocalStorage from "@/hooks/useLocalStorage";
import LoginGoogle from "./LoginGoogle";

export default function Navbar() {
  const router = useRouter();
  const accessToken = useLocalStorage("accessToken");
  const userRole = useLocalStorage("userRole");

  return (
    <Providers>
      <div className="w-full bg-[#F8F8F8] md:w-[1200px] lg:w-[1450px] m-auto">
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
              <UserMenu />
            </div>
          ) : (
            <>
              <Link href="/signin">
                <Button>
                  Sign in
                </Button>
              </Link>
              {/* <LoginGoogle /> */}
            </>
          )}
        </div>
      </div>
    </Providers>
  );
}