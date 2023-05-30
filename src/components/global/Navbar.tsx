import { useState } from "react";
import { useRouter } from 'next/navigation';
import UserMenu from "./UserMenu";

export default function Navbar() {
  const router = useRouter();
  const dropdownIcon: SVGAElement = <svg t="1685162255200" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="18" height="18"><path d="M725.333333 426.666667L512 640 298.666667 426.666667z" p-id="2380"></path></svg>;

  return (
    <div className="w-full bg-[#F8F8F8] md:w-[1200px] lg:w-[1450px] m-auto">
      <div className="py-6 flex items-center justify-between">
        <h2>Logo</h2>
        <UserMenu />
      </div>
    </div>
  );
}