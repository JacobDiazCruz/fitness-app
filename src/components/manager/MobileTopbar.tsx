'use client';
import { HamburgerIcon } from "../global/Icons";

export default function MobileTopbar() {
  return (
    <div className="md:hidden w-full top-0 sticky h-[40px] shadow-md">
      <div className="flex p-2.5">
        <HamburgerIcon className="w-5 h-5"/>
      </div>
    </div>
  );
}