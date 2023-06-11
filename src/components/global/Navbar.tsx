'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from "./UserMenu";
import Button from "./Button";
import Link from "next/link";
import Providers from "@/utils/provider";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Navbar() {
  const router = useRouter();
  const accessToken = useLocalStorage("accessToken");

  return (
    <Providers>
      <div className="w-full bg-[#F8F8F8] md:w-[1200px] lg:w-[1450px] m-auto">
        <div className="py-6 flex items-center justify-between">
          <h2>Logo</h2>
          {accessToken ? (
            <UserMenu />
          ) : (
            <Link href="/signin">
              <Button>
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Providers>
  );
}