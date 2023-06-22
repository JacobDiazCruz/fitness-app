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
import { listMessages } from "@/api/Message";
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
    <div className={`${primaryBgColor} ${borderColor} w-[520px] border-r border-r-solid`}>
      {chats?.map((chat: any, index: any) => {
        const { users, roomId, lastMessage, createdAt } = chat;

        // Find the user ID that is not equal to "myUserId"
        const otherUserId = users.find((userId: string) => userId !== myUserId);

        if(otherUserId) {
          return (
            <div 
              key={index}
              onClick={() => router.push(`/manager/messages/${roomId}`)}
              className={`${borderColor} p-3 border-t border-t-solid cursor-pointer`}
            >
              <div className="flex gap-[12px]">
                <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
                  <Image
                    alt="Trainer Image"
                    src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
                <div className="flex justify-between w-[80%]">
                  <div>
                    <h4 className={`${primaryTextColor} font-semibold`}>{otherUserId}</h4>
                    <p className={`${secondaryTextColor} font-light text-[14px]`}>
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
        } else {
          return <></>;
        }
      })}
    </div>
  );
}