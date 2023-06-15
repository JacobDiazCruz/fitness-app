'use client';

import { CheckCircleIcon, CloseIcon } from "./Icons";
import useAlert from "@/contexts/Alert";
import { useEffect } from "react";

export default function Alert() {
  const { showAlert, message, dispatchAlert } = useAlert();

  const handleClose = () => {
    dispatchAlert({
      type: "REMOVE"
    })
  };

  return (
    <>
      {showAlert && (
        <div className="m-5 bg-zinc-800 text-white z-[990] px-5 py-6 rounded-lg fixed left-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="text-green-500">
                <CheckCircleIcon className="text-green-500 w-7 h-7"/>
              </div>
              <p className="font-light">{message}</p>
            </div>
            <button 
              className="ml-10 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}