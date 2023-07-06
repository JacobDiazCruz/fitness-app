'use client';

import { borderColor, primaryTextColor } from "@/utils/themeColors";
import ChatList from "./ChatList";
import useChat from "@/contexts/Message/useChat";

export default function Messages() {
  const { chats } = useChat();

  return (
    <div className="messages-page">
      <div className="relative h-[90vh] flex">
        {chats?.length ? (
          <>
            <div className="w-[500px] overflow-hidden">
              <ChatList />
            </div>
            <div className={`w-full overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex flex-col`}>
            </div>
          </>
        ) : (
          <div className={`col-span-8 overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex flex-col`}>
            <h4 className={`${primaryTextColor} font-semibold text-[18px]`}>
              No messages yet
            </h4>
            <p className={`${primaryTextColor} font-light text-[14px]`}>
              Start by messaging the people you know
            </p>
          </div>
        )}
      </div>
    </div>
  );
}