'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { socket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import ChatList from "../ChatList";
import { getCoachProfile, getProfile } from "@/api/Profile";
import { useQuery } from "react-query";
import MessageInput from "../MessageInput";
import useMessageSender from "@/hooks/messages/useMessageSender";

const roomId = Math.random().toString();

export default function Messages() {
  const router = useRouter();

  // get essentials
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const accessToken = useLocalStorage("accessToken");

  // hooks
  const { uploadFilesMutation } = useMessageSender();  

  // state messages
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // join room
    socket.emit("joinRoom", roomId);

    // Handle incoming messages
    socket.on("message", (messageData) => {
      const { roomId, message, createdAt} = messageData;
      router.push(`/manager/messages/${roomId}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  // get exercise data
  const { 
    isLoading,
    isError,
    data: receiverProfile,
    error,
    refetch
  } = useQuery('getReceiverProfile', () => getProfile({ userId: receiverId }), {
    refetchOnMount: true
  });

  const newReceiver = {
    userId: receiverId,
    thumbnailImage: receiverProfile?.profileImage?.thumbnailImage,
    firstName: receiverProfile?.firstName,
    lastName: receiverProfile?.lastName
  }

  console.log("newReceiver", newReceiver)

  return (
    <div className="messages-page">
      <div className="h-[100vh] flex">
        <ChatList />

        {/* Chat */}
          <div className={`${primaryBgColor} ${borderColor} w-full relative px-6 py-3 border-t border-t-solid`}>
            <div className={`${primaryBgColor} ${borderColor} z-[100] flex w-full py-5 mb-6 sticky top-0 border-b border-b-solid`}>
              <div className="rounded-full relative overflow-hidden w-10 h-10">
                {receiverProfile?.profileImage?.thumbnailImage && (
                  <Image
                    alt="Trainer Image"
                    src={receiverProfile?.profileImage?.thumbnailImage}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                )}
              </div>
              <div className="ml-3">
                <h4 className={`${primaryTextColor} font-semibold text-[14px]`}>
                  {receiverProfile?.firstName} {receiverProfile?.lastName}
                </h4>
                <p className={`${secondaryTextColor} font-light text-[12px]`}>
                  {receiverProfile?.email}
                </p>
              </div>
          </div>
          <div className="relative overflow-auto h-[70vh]">
            {messages?.map((message: Message, index: number) => (
              <div className="mt-1 flex flex-row-reverse">
                {message?.files?.length ? (
                  <FilesDisplay 
                    files={message?.files}
                    isLoading={uploadFilesMutation?.isLoading}
                  />
                ) : message?.message && (
                  <div
                    dangerouslySetInnerHTML={{__html: message?.message}}
                    className="dark:bg-blue-500 dark:text-neutral-50 bg-neutral-800 text-gray-50 py-3 px-4 rounded-xl lg:max-w-[500px]"
                  />
                )}
              </div>
            ))}
          </div>
          <MessageInput
            socket={socket}
            roomId={roomId}
            type="NEW_CHAT"
            accessToken={accessToken}
            receiverId={receiverId}
            uploadFilesMutation={uploadFilesMutation}
            newReceiver={newReceiver}
          />
        </div>
      </div>
    </div>
  );
}