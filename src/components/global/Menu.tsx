import React, { useRef, useEffect, MutableRefObject, ReactNode, Dispatch, SetStateAction } from "react";


interface MenuItemsProps {
  children: ReactNode;
};

interface MenuItemProps {
  children: ReactNode;
  onClick: any;
};

interface MenuProps {
  children: ReactNode;
  open: boolean;
  buttonRef?: any;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

export const MenuItems = ({ children }: MenuItemsProps) => {
  return (
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      {children}
    </ul>
  );
};

export const MenuItem = ({ 
  children,
  onClick
}: MenuItemProps) => {
  return (
    <li
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkTheme-900 dark:hover:text-white cursor-pointer"
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default function Menu ({
  children,
  open,
  buttonRef,
  setIsDropdownOpen
}: MenuProps) {

  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleOutsideClick = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef?.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="z-[150] fixed inline-block">
      {open && (
        <div
          id="dropdown"
          ref={dropdownRef}
          className="bg-white dark:bg-darkTheme-600 divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          {children}
        </div>
      )}
    </div>
  );
};