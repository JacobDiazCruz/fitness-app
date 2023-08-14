import { ReactNode } from "react";
import { LoadingIcon } from "./Icons";

interface ButtonProps {
  id?: string;
  variant?: ButtonVariant;
  className?: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: any;
  loading?: boolean,
  disabled?: boolean,
  children: ReactNode;
};

export type ButtonVariant = 'contained' | 'outlined' | 'special' | 'success' | 'danger';

export default function Button({
  id,
  variant = "contained",
  className = "h-[45px]",
  startIcon,
  endIcon,
  onClick,
  loading = false,
  disabled = false,
  children
}: ButtonProps) {
  
  const variantsCollection = {
    contained: 'dark:bg-blue-600 dark:text-white bg-[#24282C] border-[#24282C] text-white border border-solid',
    success: 'dark:bg-green-600 dark:text-white bg-green-600 border-green-600 text-white border border-solid',
    danger: 'dark:bg-red-600 dark:text-white bg-red-600 border-red-600 text-white border border-solid',
    outlined: 'dark:bg-darkTheme-900 dark:border-neutral-700 dark:text-neutral-400 bg-white border-neutral-300 text-darkTheme-900 border border-solid',
    special: 'bg-gradient-to-r from-indigo-500 via-purple-800 to-pink-800 text-white',
  };

  return (
    <button
      id={id}
      type="button"
      className={`${variantsCollection[variant]} ${className} text-center h-[45px] px-4 rounded-lg overflow-hidden`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {loading && <LoadingIcon />}
        <div className={`text-[14px] text-center`}>
          {children}
        </div>
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </div>
    </button>
  );
}