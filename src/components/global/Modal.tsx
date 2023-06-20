
import {
  secondaryBgColor, 
  borderColor
} from "@/utils/themeColors";
interface Props {
  onClose: any;
  className: string;
  children: React.ReactNode;
};

export default function Modal({
  onClose,
  className,
  children
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-60 z-[90]"
        onClick={onClose}
      ></div>
      <div
        className={`
          ${className} 
          ${secondaryBgColor} 
          ${borderColor}
          dark:border-style dark:border
          shadow-sm rounded-lg m-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none`}
      >
        {children}
      </div>
    </>
  );
}