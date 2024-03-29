import { useState } from "react";

interface Props {
  value: boolean;
  handleClick: () => void;
};

export default function Switch({
  value = false,
  handleClick
}: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            readOnly
          />
          <div
            onClick={() => {
              handleClick(!value);
            }}
            className="w-11 h-6 bg-[#eeee] rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#005fff]"
          ></div>
        </label>
      </div>
    </div>
  );
}