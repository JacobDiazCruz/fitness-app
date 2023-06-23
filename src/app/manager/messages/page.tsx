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
import useChat from "./useChat";
import ChatList from "./ChatList";

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
      <div className="h-[100vh] flex">
        <ChatList />
        <div className={`${primaryBgColor} ${borderColor} w-full relative p-3 border-t border-t-solid`}>
        </div>
      </div>
    </div>
  );
}