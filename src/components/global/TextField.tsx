'use client';


import { ReactElement, ReactNode, useState } from "react";
import {
  primaryTextColor, 
  fieldBgColor
} from "@/utils/themeColors";
interface Props {
  value?: string | number | null;
  onChange?: (e: any) => void;
  className?: string;
  type?: string;
  inputRef?: any;
  startIcon?: ReactElement | ReactNode | SVGAElement | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function TextField({
  value = "",
  className = "",
  type = "text",
  inputRef = null,
  startIcon = null,
  disabled = false,
  placeholder = "",
  onChange = () => {},
  required = false
}: Props) {
  return (
    <div className="text-field relative z-[10]">
      {startIcon && (
        <div className="startIcon-container z-[11] absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        ref={inputRef}
        className={`
          ${startIcon ? 'pl-8' : ''}
          ${className}
          ${fieldBgColor}
          ${primaryTextColor}
          border h-[45px] z-[10] relative text-sm rounded-lg focus:gray-300 focus:gray-300 block w-full p-2.5
          ${disabled ? 'opacity-50' : ''}`} 
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}