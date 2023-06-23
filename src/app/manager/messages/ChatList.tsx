'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import { useQuery } from "react-query";
import useChat from "./useChat";

export default function ChatList() {
  const router = useRouter();
  const params = useParams();
  const { chats } = useChat();

  // get initial receiverId
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const accessToken = useLocalStorage("accessToken");
  const myUserId = useLocalStorage("userId");

  return (
    <div className={`${primaryBgColor} ${borderColor} w-[460px] border-r border-r-solid`}>
      {chats?.map((chat: any, index: any) => {
        const { users, roomId, lastMessage, createdAt } = chat;

        // Find the user ID that is not equal to "myUserId"
        const otherUser = users.find((user: any) => user.userId !== myUserId);

        const { firstName, lastName, thumbnailImage } = otherUser;
        if(otherUser) {
          return (
            <div
              key={index}
              onClick={() => router.push(`/manager/messages/${roomId}`)}
              className={`
                ${borderColor}
                ${params.id === roomId && 'dark:bg-neutral-900'}
                p-3 border-t border-t-solid cursor-pointer
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
                      {lastMessage}
                    </p>
                  </div>
                  <p className={`${secondaryTextColor} text-[12px]`}>
                    May 30
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