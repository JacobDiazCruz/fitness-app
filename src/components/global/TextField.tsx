'use client';


import { useState } from "react";
import {
  primaryTextColor, 
  fieldBgColor
} from "@/utils/themeColors";
interface Props {
  value: string | number;
  className: string;
  type: string;
  startIcon: SVGAElement;
  placeholder: string;
  disabled: boolean;
  onChange: () => void;
  required: boolean;
};

export default function TextField({
  value = "",
  className = "",
  type = "text",
  startIcon,
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
        className={`
          ${startIcon && 'pl-8'}
          ${className}
          ${fieldBgColor}
          ${primaryTextColor}
          border h-[45px] z-[10] relative text-sm rounded-lg focus:gray-300 focus:gray-300 block w-full p-2.5`} 
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}