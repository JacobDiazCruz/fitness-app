'use client';
import { useState } from "react";

interface Props {
  value: string | number;
  className: string;
  type: string;
  startIcon: SVGAElement;
  placeholder: string;
  onChange: () => void;
  required: boolean;
};

export default function TextField({
  value,
  className,
  type,
  startIcon,
  placeholder,
  onChange,
  required
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
          ${className || "bg-white"} 
          border h-[45px] z-[10] relative text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 border-gray-200 placeholder-gray-400`} 
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

TextField.defaultProps = {
  value: "",
  className: "",
  type: "text",
  placeholder: "",
  required: false,
  onChange: () => {}
}