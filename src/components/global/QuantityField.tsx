'use client';


import { ReactElement, ReactNode, useState } from "react";
import {
  primaryTextColor, 
  fieldBgColor,
  borderColor
} from "@/utils/themeColors";
import { FaAd, FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
interface Props {
  value?: string | number | null;
  onChange?: any;
  className?: string;
  type?: string;
  startIcon?: ReactElement | ReactNode | SVGAElement | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function QuantityField({
  value = "",
  className = "",
  type = "text",
  startIcon = null,
  disabled = false,
  placeholder = "",
  onChange,
  required = false
}: Props) {
  return (
    <div 
      className={`
        ${fieldBgColor}
        ${primaryTextColor}
        text-field relative z-[10] flex rounded-lg overflow-hidden
        border
        h-[45px]
      `}
    >
      <div 
        className={`${borderColor} cursor-pointer flex items-center border-r w-[80px] h-full z-[15] p-2`}
        onClick={() => {
          onChange(parseInt(value) - 1)
        }}
      >
        <AiOutlineMinus className="w-3 h-3 m-auto" />
      </div>
      <input
        type={type}
        className={`
          ${startIcon ? 'pl-8' : ''}
          ${className}
          ${primaryTextColor}
          dark:bg-darkTheme-950 dark:border-neutral-800 bg-white border-gray-200 dark:placeholder-neutral-500 placeholder-neutral-400
          h-[45px] z-[10] relative text-center text-sm focus:gray-300 focus:gray-300 block w-full p-2.5
          ${disabled ? 'opacity-50' : ''}`} 
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <div 
        className={`${borderColor} cursor-pointer flex items-center border-l w-[80px] h-full right-0 z-[15] p-2`}
        onClick={() => {
          onChange(parseInt(value) + 1)
        }}
      >
        <AiOutlinePlus className="w-3 h-3 m-auto" />
      </div>
    </div>
  );
}