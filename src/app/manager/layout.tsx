'use client'

import { useState } from "react";
import Sidebar from "@/components/manager/Sidebar";
import Header from "@/components/manager/Header"
import TextField from "@/components/global/TextField";
import AutoComplete from "@/components/global/AutoComplete";

export default function ManagerLayout ({
  pageTitle,
  backIcon,
  backPath,
  children
}: {
  pageTitle: string;
  backIcon: boolean;
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-10 height-[100vh]">
        {children}
      </div>
    </div>
  );
}