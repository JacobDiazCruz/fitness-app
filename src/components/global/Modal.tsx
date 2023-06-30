
import {
  secondaryBgColor, 
  borderColor
} from "@/utils/themeColors";
import { CloseIcon } from "./Icons";
interface Props {
  onClose: any;
  className: string;
  children: React.ReactNode;
};

export const ModalFooter = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="py-5 px-3 w-full bottom-0 absolute">
      {children}
    </div>
  )
};

export default function Modal({
  onClose,
  className,
  children
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full dark:bg-neutral-500 bg-darkTheme-950 opacity-60 z-[600]"
        onClick={onClose}
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
          className="dark:bg-white cursor-pointer shadow-xl border border-solid bg-white fixed items-center rounded-full w-[20px] h-[20px] absolute right-[-10px] top-[-10px] z-[999]"
        >
          <CloseIcon className="w-4 h-4 m-auto"/>
        </div>
        <div className={`content overflow-y-auto h-full`}>
          {children}
        </div>
      </div>
    </>
  );
}