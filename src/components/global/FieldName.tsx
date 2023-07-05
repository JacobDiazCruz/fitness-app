import { primaryTextColor } from "@/utils/themeColors";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  required?: boolean;
};

export default function FieldName({
  children,
  required = false
}: Props) {
  return (
    <p className={`${primaryTextColor} text-[14px] mb-2`}>
      {children}
      {required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </p>
  );
}