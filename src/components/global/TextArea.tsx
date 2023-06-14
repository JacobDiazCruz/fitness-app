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

export default function TextArea({
  value,
  className,
  type,
  startIcon,
  placeholder,
  onChange,
  required
}: Props) {
  return (
    <div className="text-field relative">
      {startIcon && (
        <div className="startIcon-container absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {startIcon}
        </div>
      )}
      <textarea
        rows="4"
        cols="60"
        className={`
          ${startIcon && 'pl-10'}
          ${className} 
          bg-[#f6f6f6] border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full p-2.5 border-gray-200 placeholder-gray-400`} 
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

TextArea.defaultProps = {
  value: "",
  className: "",
  type: "text",
  placeholder: "",
  required: false
}