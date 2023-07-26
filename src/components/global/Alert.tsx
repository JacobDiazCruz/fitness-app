'use client';

import { CheckIcon, CloseIcon } from "./Icons";
import useAlert from "@/contexts/Alert";import { useEffect } from "react";
import { MdClose } from "react-icons/md";
;

export default function Alert() {
  const { showAlert, type, message, dispatchAlert }: any = useAlert();

  const handleClose = () => {
    dispatchAlert({
      type: "REMOVE"
    })
  };

  useEffect(() => {
    let timeoutId: any;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        handleClose();
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [showAlert]);

  if(showAlert) {
    return (
      <div className="m-5 bg-zinc-800 dark:bg-zinc-100 text-white z-[990] px-5 py-6 rounded-lg fixed bottom-0 right-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            {type === "SUCCESS" ? (
              <div className="bg-green-500 w-[20px] h-[20px] rounded-full flex items-center">
                <CheckIcon className="fill-white w-5 h-5 m-auto"/>
              </div>
            ) : (
              <div className="bg-red-500 w-[20px] h-[20px] rounded-full flex items-center">
                <MdClose className="fill-white w-4 h-4 m-auto" />
              </div>
            )}
            <p className="font-normal text-white dark:text-darkTheme-950">
              {message}
            </p>
          </div>
          <button 
            className="dark: ml-7 cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon className="text-neutral-500 w-5 h-5"/>
          </button>
        </div>
      </div>
    );
  }
  return <></>;
}