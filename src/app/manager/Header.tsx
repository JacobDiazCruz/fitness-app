import { useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from "@/components/global/UserMenu";
import Link from "next/link";

export default function Header ({ 
  pageTitle,
  backIcon
}: any) {
  const leftArrowIcon: SVGAElement = <svg t="1685437183453" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1681" width="25" height="25"><path d="M800 480H268.8l233.6-233.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-284.8 288c-12.8 12.8-12.8 32 0 44.8h3.2l284.8 288c6.4 6.4 16 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6 12.8-12.8 12.8-32 0-44.8L272 544H800c19.2 0 32-12.8 32-32s-16-32-32-32z" fill="#666666" p-id="1682"></path></svg>;
  
  return (
    <div className="p-10 w-full flex items-center justify-between">
      <div className="flex gap-[10px] items-center">
        {backIcon && (
          <Link href="/manager/exercises">
            {leftArrowIcon}
          </Link>
        )}
        <h5 className="text-[22px] text-medium">{pageTitle}</h5>
      </div>
      <UserMenu />
    </div>
  );
}