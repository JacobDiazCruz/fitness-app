'use client';

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon, SmileyIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import { useQuery } from "react-query";
import { listMessages } from "@/api/Message";
import ChatList from "../ChatList";
import { getChat } from "@/api/Chat";
import useChat from "../useChat";
import IconButton from "@/components/global/IconButton";
import MessageInput from "../MessageInput";

export default function Messages() {
  const router = useRouter();
  const params = useParams();
  const myUserId = useLocalStorage("userId");
  const { sendMessage, socket } = useChat();

  const [myChatDetails, setMyChatDetails] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    thumbnailImage: ""
  });
  const [otherChatDetails, setOtherChatDetails] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    thumbnailImage: ""
  });
  const chatBoxRef = useRef(null);

  // get initial receiverId
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const accessToken = useLocalStorage("accessToken");

  // state messages
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    // join room
    socket.emit("joinRoom", params.id);

    // Handle incoming messages
    socket.on("message", (messageData) => {
      const { roomId, message, createdAt} = messageData;
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the container when its size adjusts
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  // list messages data
  const { 
    isLoading,
    isError,
    data: messagesData,
    error,
    refetch
  } = useQuery('messages', () => listMessages(params.id), {
    refetchOnMount: true
  });

  useEffect(() => {
    refetch();
  }, [params.id]);

  useEffect(() => {
    if(messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  /**
   * @Purpose GET request chat data via room id
   */
  const {
    isLoading: isLoadingChatData,
    isError: isErrorChatData,
    data: chatData,
    error: errorChatData
  } = useQuery('chatData', () => getChat(params.id), {
    refetchOnMount: true
  });

  /**
   * @Purpose sets chat details on the chatbox whenever chatData is available
   */
  useEffect(() => {
    if(!chatData) {
      chatData?.users?.forEach((user) => {
        if(user.userId === myUserId) {
          setMyChatDetails(user);
        } else {
          setOtherChatDetails(user);
        }
      })
    }
  }, [chatData]);

  return (
    <div key={remountKey} className="messages-page">
      <h5 className={`${primaryTextColor} text-[22px] text-medium mb-5`}>
        Messages
      </h5>
      <div className="h-[100vh] flex">
        <ChatList />

        {/* Chat */}
        <div className={`${primaryBgColor} ${borderColor}' w-full relative border-t border-t-solid`}>
          <div ref={chatBoxRef} className="relative overflow-auto h-[70vh] p-5">
            {messages?.map((message: Message, index: number) => {
              if(message.senderId !== myUserId) {
                return (
                  // Other
                  <div className="flex gap-[12px] mt-3">
                    <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
                      {otherChatDetails?.thumbnailImage && (
                        <Image
                          alt="Other Chat Image"
                          src={otherChatDetails?.thumbnailImage}
                          style={{ objectFit: "cover" }}
                          fill
                        />
                      )}
                    </div>
                    <div className={`${tertiaryBgColor} py-3 px-4 rounded-xl lg:max-w-[500px]`}>
                      <p className={`${primaryTextColor} text-[14px]`}>
                        {message?.message}
                      </p>
                    </div>
                  </div>
                );
              } else {
                // ME
                return (
                  <div className="mt-3 flex flex-row-reverse">
                    <div className="dark:bg-neutral-100 dark:text-neutral-900 bg-neutral-800 text-gray-50 py-3 px-4 rounded-xl lg:max-w-[500px]">
                      <p className="text-[14px]">
                        {message?.message}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <MessageInput 
            handleSendMessage={(e) => {
              sendMessage({
                e,
                roomId: params.id,
                accessToken,
                receiverId
              })
            }}
          />
        </div>
      </div>
    </div>
  );
}