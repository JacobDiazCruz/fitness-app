'use client';

import Button from "@/components/global/Button";
import { AddIcon } from "@/components/global/Icons";
import Link from "next/link";

export default function TableActions() {
  return (
    <div className="flex justify-between">
      <form>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-[#DAE0E5] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-300 dark:bg-white dark:border-[#DAE0E5] dark:placeholder-gray-400 dark:text-[#000] dark:focus:ring-blue-500 dark:focus:border-blue-300" placeholder="Search Mockups, Logos..." required />
        </div>
      </form>
        <Link href="/manager/clients/add">
          <Button 
            className="btn-dark h-[50px]"
            startIcon={<AddIcon />}
          >
            Add New Client
          </Button>
        </Link>
    </div>
  );
}