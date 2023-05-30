'use client'

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header"
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
      <div className="w-full height-[100vh]">
        <Header pageTitle={pageTitle} backIcon={backIcon} backPath={backPath} />
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
}