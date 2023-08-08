'use client';

import React from "react";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";
import TextField from "./TextField";

interface Props {
  primaryBtnPath?: string;
  primaryBtnIcon?: any;
  primaryBtnContent?: any;
  searchValue?: string;
  handleSearch?: (value: string) => void;
};

export default function TableActions({
  primaryBtnPath = "",
  primaryBtnIcon = <></>,
  primaryBtnContent,
  searchValue = "",
  handleSearch
}: Props) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="flex md:justify-between justify-end">
      <div className="hidden md:block">
        <TextField 
          startIcon={<SearchIcon className="text-gray-400 w-4 h-4" />}
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      {primaryBtnContent && (
        <Button
          variant="contained"
          startIcon={primaryBtnIcon}
          onClick={() => router.push(primaryBtnPath)}
        >
          {primaryBtnContent}
        </Button>
      )}
    </div>
  );
}