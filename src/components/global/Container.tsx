import React from "react";

export default function Container({
  children,
  className
}: React.ReactNode) {
  return (
    <div className={`${className} form bg-white shadow-md width-full p-8 rounded-lg`}>
      {children}
    </div>
  );
}