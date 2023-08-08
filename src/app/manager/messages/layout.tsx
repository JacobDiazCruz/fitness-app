import { primaryTextColor } from "@/utils/themeColors";
import MessageContextProvider from "@/store/Message";
import { ReactNode } from "react";

export default function MessagesLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <MessageContextProvider>
      <div>
        <div className="h-[10vh] px-8 flex items-center">
          <h5 className={`${primaryTextColor} text-[22px] text-medium`}>
            Messages
          </h5>
        </div>
        {children}
      </div>
    </MessageContextProvider>
  );
};