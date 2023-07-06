'use client';

import Image from "next/image";
import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import useChat from "@/contexts/Message/useChat";

export default function ChatList() {
  const router = useRouter();
  const params = useParams();
  const { chats }: any = useChat();

  // get initial receiverId
  const myUserId = useLocalStorage("userId");

  const getTimeDifference = (updatedAt) => {
    const currentTime = new Date();
    const updatedTime = new Date(updatedAt);
  
    const timeDiff = Math.abs(currentTime - updatedTime);
    
    // calculate & construct minutes display
    const minutes = Math.floor(timeDiff / (1000 * 60));
    if (minutes < 60) {
      // ${minutes !== 1 ? "" : ""} 
      return `${minutes}m ago`;
    }
    
    // calculate & construct hours display
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      // ${hours !== 1 ? "s" : ""}
      return `${hours}h ago`;
    }
    
    // calculate & construct days and months
    const options = { month: "long", day: "numeric" };
    return updatedTime.toLocaleDateString(undefined, options);
  }

  return (
    <div className={`${primaryBgColor} ${borderColor} border-t border-t-solid border-r-solid`}>
      {!chats?.length && (
        <div className="text-center m-auto mt-[25vh]">
          <h4 className={`${primaryTextColor} font-semibold text-[18px]`}>
            No messages yet
          </h4>
          <p className={`${primaryTextColor} font-light text-[14px]`}>
            Start by messaging the people you know
          </p>
        </div>
      )}

      {chats?.map((chat: any, index: any) => {
        const { users, roomId, lastMessageDetails, createdAt, updatedAt } = chat;

        // Find the user ID that is not equal to "myUserId"
        const otherUser = users.find((user: any) => user.userId !== myUserId);

        const { firstName, lastName, thumbnailImage } = otherUser || {
          firstName: "",
          lastName: "",
          thumbnailImage: ""
        };

        if(otherUser) {
          return (
            <div
              key={index}
              onClick={() => router.push(`/manager/messages/${roomId}`)}
              className={`
                ${borderColor}
                ${params.id === roomId && 'dark:bg-darkTheme-900'}
                px-8 py-4 border-b border-b-solid cursor-pointer
              `}
            >
              <div className="flex gap-[12px]">
                <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
                  {thumbnailImage && (
                    <Image
                      alt="Trainer Image"
                      src={thumbnailImage}
                      style={{ objectFit: "cover" }}
                      fill
                    />
                  )}
                </div>
                <div className="flex justify-between w-[80%]">
                  <div>
                    <h4 className={`${primaryTextColor} font-semibold`}>
                      {firstName} {lastName}
                    </h4>
                    <p className={`${secondaryTextColor} truncate w-[180px] font-light text-[14px]`}>
                      {lastMessageDetails?.senderId === myUserId ? "You: " : `${firstName}: `}
                      {lastMessageDetails?.message}
                    </p>
                  </div>
                  <p className={`${secondaryTextColor} text-[12px]`}>
                    {getTimeDifference(updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          );
        }
        return <></>;
      })}
    </div>
  );
}