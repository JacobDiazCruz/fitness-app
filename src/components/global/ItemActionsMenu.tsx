import React, { useState } from "react";
import { VertDotsIcon } from "./Icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";

interface Props {
  itemId: string;
  handleDelete: any;
  editPath: any;
};

export default function ItemActionsMenu({
  itemId,
  handleDelete,
  editPath = "/error"
}: Props) {
  const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);
  const ref: any = useOutsideClick(() => setOpenUserDropdown(false));
  const router = useRouter();

  return (
    <div
      className="flex items-center cursor-pointer"
      ref={ref}
    >
      <IconButton 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          setOpenUserDropdown(!openUserDropdown)
        }}
      >
        <VertDotsIcon />
      </IconButton>
      {openUserDropdown && (
        <div className="dropdown bg-white dark:bg-darkTheme-950 dark:border dark:border-neutral-800 dark:-style w-[150px] ml-[-140px] absolute z-[999] mt-[150px] shadow-md rounded-md">
          <ul className="py-2 text-sm text-gray-700 dark:text-neutral-50" aria-labelledby="dropdownDefaultButton">
            <li onClick={(e) => {
              e.stopPropagation();
              router.push(editPath);
            }}>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900">
                Edit
              </div>
            </li>
            <li>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900">
                Duplicate
              </div>
            </li>
            <li 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setOpenUserDropdown(false);
              }}
            >
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900">
                Delete
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}