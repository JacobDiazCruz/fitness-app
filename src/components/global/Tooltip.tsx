import { ReactNode } from "react";

interface TooltipProps {
  className?: string;
  children?: ReactNode;
  tooltipClassName?: string;
  value: string;
};

export default function Tooltip({
  className,
  tooltipClassName,
  children,
  value
}: TooltipProps) {
  return (
    <div className={`group relative ${className}`}>
      {children}
      <span className={`${tooltipClassName} absolute z-100 bottom-0 ml-1 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100`}>
        {value}
      </span>
    </div>
  );
};