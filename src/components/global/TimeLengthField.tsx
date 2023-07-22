'use client';

import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  primaryTextColor, 
  fieldBgColor,
  borderColor
} from "@/utils/themeColors";
import { DropdownIcon } from "./Icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Props {
  value?: string | number;
  className?: string;
  startIcon?: ReactElement | ReactNode | SVGAElement | null;
  placeholder?: string;
  disabled?: boolean;
  timeUnit?: string;
  setTimeUnit?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

type TimeUnit = "Day/s" | "Week/s" | "Month/s" | "Year/s";

export default function TimeLengthField({
  value = "",
  className = "",
  startIcon = null,
  disabled = false,
  timeUnit,
  placeholder = "",
  setTimeUnit,
  onChange = () => {},
  required = false
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [timeUnits] = useState<TimeUnit[]>([
    "Day/s",
    "Week/s",
    "Month/s",
    "Year/s"
  ]);
  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });

  const handleOpenDropdown = () => {
    if(!openDropdown) {
      setOpenDropdown(true)
    }
  };

  const DropdownList = () => {
    const handleClickDropdownItem = (unit: TimeUnit) => {
      setTimeUnit(unit);
      setOpenDropdown(false);
    };
    
    return (
      <ul
        ref={ref}
        className="z-[100] dark:bg-darkTheme-950 bg-white dark:border-neutral-800 border border-solid absolute mt-1 max-h-[200px] w-[400px] overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
        aria-labelledby="headlessui-combobox-button-:R4q:" 
        role="listbox" 
        id="headlessui-combobox-options-:rl:" 
        data-headlessui-state="open"
      >
        <>
          {timeUnits?.map((unit: TimeUnit, index: number) => (
            <li
              key={index}
              onClick={() => handleClickDropdownItem(unit)}
              className="relative dark:hover:bg-darkTheme-900 hover:bg-gray-100 cursor-pointer select-none py-2 px-4" id="headlessui-combobox-option-:rm:" role="option" tabIndex="-1" ariaSelected="false" data-headlessui-state=""
            >
              <span className="dark:text-neutral-50 text-darkTheme-900 block truncate font-normal">
                {unit}
              </span>
            </li>
          ))}
        </>
      </ul>
    );
  };

  return (
    <div className="phone-field relative z-[10]">
      <div className={`${borderColor} flex items-center border w-full rounded-lg overflow-hidden`}>
        <input
          type="number"
          className={`
            ${startIcon && 'pl-8'}
            ${className}
            ${fieldBgColor}
            ${primaryTextColor}
            border-l
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            h-[45px] z-[10] relative text-sm focus:gray-300 focus:gray-300 block w-full p-2.5`} 
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={value}
        />
        <div 
          onClick={() => handleOpenDropdown()}
          className="min-w-[100px] w-fit flex items-center px-2 cursor-pointer"
        >
          <p className={`${primaryTextColor} m-auto`}>
            {timeUnit}
          </p>
          <DropdownIcon className={`dark:fill-white fill-black w-4 h-4`} />
        </div>
      </div>
      {openDropdown && <DropdownList />}
    </div>
  );
}