'use client';

import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";
import TextField from "./TextField";

export default function TableActions({
  primaryBtnPath = "",
  primaryBtnIcon = <></>,
  primaryBtnContent,
  searchValue,
  handleSearch
}) {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <TextField 
        startIcon={<SearchIcon className="text-gray-400 w-4 h-4" />}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        variant="contained"
        startIcon={primaryBtnIcon}
        onClick={() => router.push(primaryBtnPath)}
      >
        {primaryBtnContent}
      </Button>
    </div>
  );
}