'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";
import Header from "../Header";
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