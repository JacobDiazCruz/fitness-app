'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import io from "socket.io-client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import { useQuery } from "react-query";
import ChatList from "./ChatList";
import useChat from "@/hooks/messages/useChat";

export default function Messages() {
  const router = useRouter();
  const params = useParams();
  const { chats } = useChat();

  // get initial receiverId
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const accessToken = useLocalStorage("accessToken");
  const myUserId = useLocalStorage("userId");

  return (
    <div className="messages-page">
      <h5 className={`${primaryTextColor} text-[22px] text-medium mb-5`}>
        Messages
      </h5>
        {chats?.length ? (
          <div className="h-[100vh] flex">
            <ChatList />
          </div>
        ) : (
          <div className="text-center m-auto mt-[25vh]">
            <h4 className={`${primaryTextColor} font-semibold text-[18px]`}>
              No messages yet
            </h4>
            <p className={`${primaryTextColor} font-light text-[14px]`}>
              Start by messaging the people you know
            </p>
          </div>
        )}
    </div>
  );
}