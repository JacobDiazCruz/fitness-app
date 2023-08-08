'use client';

import { borderColor, primaryBgColor } from "@/utils/themeColors";
import useChat from "@/store/Message/useChat";
import ChatListItem from "./ChatListItem";
import ChatListEmpty from "./ChatListEmpty";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ChatList() {
  const { chats }: any = useChat();

  // get initial receiverId
  const myUserId = useLocalStorage("userId");

  return (
    <div className="w-[500px] overflow-hidden">
      <div className={`${primaryBgColor} ${borderColor} border-t border-t-solid border-r-solid`}>
        <ChatListEmpty chatsLength={chats?.length} />

        {chats?.map((chat: any, index: any) => {
          const { users, roomId, lastMessageDetails, updatedAt } = chat;

          // Find the user ID that is not equal to "myUserId"
          const otherUserDetails = users.find((user: any) => user.userId !== myUserId);

          // If a user chats himself
          const allUsersHaveSameUserId = users.every((user: any) => user.userId === myUserId);
          const myUserDetails = users.find((user: any) => user.userId === myUserId);

          if(otherUserDetails) {
            return (
              <ChatListItem
                key={index}
                userDetails={otherUserDetails}
                lastMessageDetails={lastMessageDetails}
                roomId={roomId}
                updatedAt={updatedAt}
              />
            );
          }

          if(allUsersHaveSameUserId) {
            return (
              <ChatListItem 
                key={index}
                userDetails={myUserDetails}
                lastMessageDetails={lastMessageDetails}
                roomId={roomId}
                updatedAt={updatedAt}
              />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};