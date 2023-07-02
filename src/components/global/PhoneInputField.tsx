'use client';

import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  primaryTextColor, 
  fieldBgColor,
  borderColor
} from "@/utils/themeColors";
import { DropdownIcon } from "./Icons";
import axios from "axios";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Props {
  value?: string | number;
  className: string;
  type: string;
  startIcon?: ReactElement | ReactNode | SVGAElement | null;
  placeholder: string;
  disabled: boolean;
  countryCode: string;
  setCountryCode: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
};

interface CountryCodes {
  name: string;
  dial_code: string;
  code: string;
};

export default function PhoneInputField({
  value = "",
  className = "",
  type = "text",
  startIcon = null,
  disabled = false,
  countryCode,
  placeholder = "",
  setCountryCode,
  onChange = () => {},
  required = false
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [countryCodes, setCountryCodes] = useState<Array<CountryCodes>>([]);
  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });

  useEffect(() => {
    getCountryCodes();
  }, []);  

  const getCountryCodes = async () => {
    try {
      const res = await axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
      setCountryCodes(res.data);
    } catch(err) {
      console.log(err)
    }
  };

  const handleOpenDropdown = () => {
    if(!openDropdown) {
      setOpenDropdown(true)
    }
  };

  const DropdownList = () => {
    const handleClickDropdownItem = (item) => {
      setCountryCode(item.dial_code);
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
        {countryCodes.length ? (
          <>
            {countryCodes?.map((country: any, index: number) => (
              <li
                key={index}
                onClick={() => handleClickDropdownItem(country)}
                className="relative dark:hover:bg-darkTheme-900 hover:bg-gray-100 cursor-pointer select-none py-2 px-4" id="headlessui-combobox-option-:rm:" role="option" tabIndex="-1" ariaSelected="false" data-headlessui-state=""
              >
                <span className="dark:text-neutral-50 text-darkTheme-900 block truncate font-normal">
                  {country.name} {country.dial_code}
                </span>
              </li>
            ))}
          </>
        ) : (
          <li className="py-3 pl-4">
            <span>No result.</span>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="phone-field relative z-[10]">
      <div className={`${borderColor} flex items-center border w-full rounded-lg overflow-hidden`}>
        <div 
          onClick={() => handleOpenDropdown()}
          className="min-w-[70px] w-fit flex items-center px-2 cursor-pointer"
        >
          <p className={`${primaryTextColor} m-auto`}>
            {countryCode}
          </p>
          <DropdownIcon className={`dark:fill-white fill-black w-4 h-4`} />
        </div>
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
      </div>
      {openDropdown && <DropdownList />}
    </div>
  );
}