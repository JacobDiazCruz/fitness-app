'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { socket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { Message } from "@/utils/types";
import { getProfile } from "@/api/Profile";
import { useQuery } from "react-query";
import useMessageSender from "@/store/Message/useMessageSender";
import MessageInput from "../MessageInput";
import MessagesList from "../MessagesList";
import RecepientHeader from "../RecepientHeader";
import ChatList from "../ChatList";

const roomId = Math.random().toString();

export default function Messages() {
  const router = useRouter();

  // get essentials
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");

  // hooks
  const { uploadFilesMutation }: any = useMessageSender()!; 

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
    data: receiverProfile
  } = useQuery('getReceiverProfile', () => getProfile({ userId: receiverId }), {
    refetchOnMount: true
  });

  const newReceiver = {
    userId: receiverId,
    thumbnailImage: receiverProfile?.profileImage?.thumbnailImage,
    firstName: receiverProfile?.firstName,
    lastName: receiverProfile?.lastName
  }

  return (
    <div className="new-message-page">
      <div className="relative h-[90vh] flex">
        <ChatList />

        {/* Chat */}
        <div className={`w-full overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex flex-col`}>
          <RecepientHeader receiverProfile={receiverProfile} />
          <div className="relative overflow-auto flex-grow px-4">
            <MessagesList messages={messages} />
          </div>
          <MessageInput
            uploads={<MessageInput.Uploads />}
            field={
              <MessageInput.Field
                type="NEW_CHAT"
                roomId={roomId}
                newReceiver={newReceiver}
              />
            }
            actions={
              <MessageInput.Actions
                type="NEW_CHAT"
                roomId={roomId}
                newReceiver={newReceiver}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};