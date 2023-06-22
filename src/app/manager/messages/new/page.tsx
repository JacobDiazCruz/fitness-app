'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import io from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import ChatList from "../ChatList";

const roomId = Math.random().toString();

export default function Messages() {
  const router = useRouter();

  // get initial receiverId
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const accessToken = useLocalStorage("accessToken");

  // Establish a connection to the socket server
  const socket = io("http://localhost:4000");

  // state messages
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // join room
    socket.emit("joinRoom", roomId);

    // Handle incoming messages
    socket.on("message", (messageData) => {
      const { roomId, message, createdAt} = messageData;
      console.log("Received message:", message);
      router.push(`/manager/messages/${roomId}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);
  
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // Example: Send a private message
      const messageData = {
        roomId,
        accessToken,
        receiverId,
        message: e.target.innerText
      };

      // send private chat and message will also be created with the receiver
      socket.emit("privateMessage", messageData);
      e.target.innerText = "";
    }
  };

  return (
    <div className="messages-page">
      <h5 className={`${primaryTextColor} text-[22px] text-medium mb-5`}>
        Messages
      </h5>
      <div className="h-[100vh] flex">
        <ChatList />

        {/* Chat */}
        <div className={`${primaryBgColor} ${borderColor} w-full relative p-3 border-t border-t-solid`}>
          <div className="relative overflow-auto h-[70vh]">
            {messages?.map((message: Message, index: number) => (
              // Other
              <div className="flex gap-[12px] mt-3">
                <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
                  <Image
                    alt="Trainer Image"
                    src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
                <div className={`${tertiaryBgColor} text-gray-900 py-3 px-4 rounded-3xl w-[50%]`}>
                  <p className={`${primaryTextColor} text-[14px]`}>
                    {message?.message}
                  </p>
                </div>
              </div>
            ))}
            {/* ME */}
            <div className="mt-3 flex flex-row-reverse">
              <div className="flex gap-[12px]">
                <div className="bg-gray-800 text-gray-50 py-3 px-4 rounded-3xl lg:w-[500px]">
                  <p className="text-[14px]">
                    Hey hey, just a reminder that I will be out of town for a wedding next week! town for a wedding next week!town for a wedding next week!town for a wedding next week!town for a wedding next week!town for a wedding next week!
                  </p>
                </div>
                <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
                  <Image
                    alt="Trainer Image"
                    src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Send */}
          <div className="relative w-full h-[60px]">
            <div 
              className={`
                ${fieldBgColor}
                ${primaryTextColor}
                text-[14px]
                h-[60px] overflow-auto border-solid border rounded-lg p-3
              `}
              onKeyDown={handleKeyDown}
              contentEditable
            ></div>
            <div className="flex justify-between mt-2">
              <div>
                <ImageIcon className="w-8 h-8" />
              </div>
              <div>
                <Button variant="contained">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profiles */}
        {/* <div className="bg-white w-[0px] border-l border-l-solid border-gray-200 p-6">
          <div className="rounded-full w-[60px] h-[60px] relative overflow-hidden m-auto">
            <Image
              alt="Trainer Image"
              src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <h3 className="font-semibold text-center mt-1">
            John Doe
          </h3>
        </div> */}
      </div>
    </div>
  );
}