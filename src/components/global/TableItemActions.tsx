import { useState } from "react";
import { VertDotsIcon } from "./Icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";

export default function TableItemActions({
  itemId
}) {
  const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setOpenUserDropdown(false));
  const router = useRouter();

  return (
    <div
      className="flex items-center cursor-pointer"
      ref={ref}
    >
      <IconButton onClick={() => setOpenUserDropdown(!openUserDropdown)}>
        <VertDotsIcon />
      </IconButton>
      {openUserDropdown && (
        <div className="dropdown w-[150px] ml-[-140px] absolute z-[999] bg-white mt-[150px] shadow-md rounded-md">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownDefaultButton">
            <li onClick={() => router.push(`/manager/exercises/edit/${itemId}`)}>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100">
                Edit
              </div>
            </li>
            <li>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100">
                Duplicate
              </div>
            </li>
            <li>
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100">
                Delete
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}