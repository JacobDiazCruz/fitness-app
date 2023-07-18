import React, { ReactNode } from "react";

interface IconButtonProps {
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  noPadding?: boolean;
  children: ReactNode;
  iconBtnRef?: any;
};

export default function IconButton({
  className,
  onClick,
  noPadding,
  iconBtnRef,
  children
}: IconButtonProps) {
  return (
    <button 
      onClick={onClick}
      ref={iconBtnRef}
      className={`
        ${className}
        ${!noPadding && 'p-2'}
        dark:hover:bg-neutral-800 rounded-full hover:bg-neutral-100 text-left`}>
      {children}
    </button>
  );
};