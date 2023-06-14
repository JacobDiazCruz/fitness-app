'use client';

import Button from "@/components/global/Button";
import Link from "next/link";
import { SearchIcon } from "./Icons";
import TextField from "./TextField";

export default function TableActions({
  primaryBtnPath = "",
  primaryBtnIcon = <></>,
  primaryBtnContent
}) {
  return (
    <div className="flex justify-between">
      <TextField 
        startIcon={<SearchIcon className="text-gray-400 w-4 h-4" />}
        placeholder="Search"
      />
        <Link href={primaryBtnPath}>
          <Button
            variant="contained"
            startIcon={primaryBtnIcon}
          >
            {primaryBtnContent}
          </Button>
        </Link>
    </div>
  );
}