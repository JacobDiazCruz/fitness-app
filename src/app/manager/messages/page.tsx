'use client';

import { borderColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import useChat from "@/contexts/Message/useChat";
import { LuMessagesSquare } from "react-icons/lu";
import ChatList from "./ChatList";

export default function Messages() {
  const { chats }: any = useChat();

  return (
    <div className="messages-page">
      {chats?.length ? (
        <div className="relative h-[90vh] flex">
          <ChatList />
          <div className={`w-full overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex flex-col`}></div>
        </div>
      ) : (
        <div className={`col-span-8 overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex items-center text-center`}>
          <div className="m-auto mt-10">
            <LuMessagesSquare className={`${secondaryTextColor} w-10 h-10 m-auto`} />
            <h4 className={`${primaryTextColor} font-semibold text-[18px] mt-5`}>
              No messages yet
            </h4>
            <p className={`${primaryTextColor} font-light text-[14px]`}>
              Start by messaging the people you know
            </p>
          </div>
        </div>
      )}
    </div>
  );
};