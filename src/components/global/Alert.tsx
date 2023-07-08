'use client';

import { CheckIcon, CloseIcon } from "./Icons";
import useAlert from "@/contexts/Alert";;

export default function Alert() {
  const { showAlert, message, dispatchAlert }: any = useAlert();

  const handleClose = () => {
    dispatchAlert({
      type: "REMOVE"
    })
  };

  if(showAlert) {
    return (
      <div className="m-5 bg-zinc-800 dark:bg-zinc-100 text-white z-[990] px-5 py-6 rounded-lg fixed bottom-0 right-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="bg-green-500 w-[20px] h-[20px] rounded-full">
              <CheckIcon className="fill-white w-5 h-5 m-auto"/>
            </div>
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