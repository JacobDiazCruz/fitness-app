
import {
  borderColor, primaryTextColor
} from "@/utils/themeColors";
import { MdClose } from "react-icons/md";
interface ModalProps {
  onClose: () => void;
  className?: string;
  persist?: boolean;
  children: React.ReactNode;
};

interface ChildProps {
  children: React.ReactNode;
};

export const ModalFooter = ({
  children
}: ChildProps) => {
  return (
    <div className={`${borderColor} py-5 px-3 w-full z-[100] bottom-[0] absolute border-t dark:bg-darkTheme-600 bg-white`}>
      {children}
    </div>
  );
};

export const ModalContent = ({
  height = "h-full",
  children
}: any) => {
  return (
    <div className={`${height} content overflow-y-auto relative p-7`}>
      {children}
    </div>
  );
};

export const ModalHeader = ({
  children
}: ChildProps) => {
  return (
    <div className={`${borderColor} py-5 px-7 w-full top-0 sticky z-[100] border-b dark:bg-darkTheme-600 bg-white`}>
      {children}
    </div>
  );
};

export const ModalTitle = ({
  children
}: ChildProps) => {
  return (
    <h2 className={`${primaryTextColor} font-semibold dark:font-normal`}>
      {children}
    </h2>
  );
}

export default function Modal({
  onClose,
  className,
  persist,
  children
}: ModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full dark:bg-neutral-500 bg-darkTheme-950 opacity-60 z-[600]"
        onClick={() => {
          if(!persist) {
            onClose();
          }
        }}
      ></div>
      <div
        className={`
          ${className} 
          dark:bg-darkTheme-600
          bg-white
          ${borderColor}
          dark:border-style dark:border
          dark:shadow-2xl
          shadow-sm rounded-lg m-auto fixed inset-0 z-[700] outline-none focus:outline-none
          `}
      >
        <div
          onClick={onClose}
          className="dark:bg-white flex items-center bg-neutral-700 cursor-pointer shadow-xl dark:border border-solid fixed items-center rounded-full w-[23px] h-[23px] absolute right-[-10px] top-[-10px] z-[999]"
        >
          <MdClose className={`dark:fill-neutral-800 fill-white w-4 h-4 m-auto`}/>
        </div>
        <div className="relative h-full rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
};