'use client';

import { getChat, listChats } from "@/api/Chat";
import useLocalStorage from "@/hooks/useLocalStorage";
import { socket } from "@/utils/socket";
import { useParams } from "next/navigation";
import { createContext, useContext, useMemo, ReactNode, useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";

const ChatContext = createContext(null);

interface ChatNotif {
  receiverId: string;
  message: string;
  createdAt: any;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const myUserId = useLocalStorage("userId");
  const chatBoxRef = useRef(null);

  const [chatNotifData, setChatNotifData] = useState<ChatNotif>({
    receiverId: "",
    message: "",
    createdAt: null
  });

  const [messageReceiverUserDetails, setMessageReceiverUserDetails] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    thumbnailImage: ""
  });

  const [selectedFile, setSelectedFile] = useState<string>("");

  const { 
    isLoading: isLoadingChats, 
    isError: isErrorChats,
    data: chats,
    error: errorChats
  } = useQuery('chats', listChats);

  useEffect(() => {
    // your userId automatically be subscrubed to a notification socket
    if(myUserId) {
      socket.emit("notifUserId", myUserId);
    }

    // Assuming you have a Socket.IO client instance
    socket.on("notification", (notifData) => {
      // Handle the received notification
      if(notifData?.receiverId == myUserId) {
        setChatNotifData(notifData);
        console.log("Received notification:", notifData);
      }
    });
  }, [myUserId]);

  /**
   * @purpose GET request chat data via room id
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
   * @purpose To set chat details on the chatbox whenever chatData is available
   * @note This is used to display the thumbnailImage and get the profile link of the sender and receiver.
   */
   useEffect(() => {
    if(chatData) {
      chatData?.users?.forEach((user: any) => {
        if(user.userId !== myUserId) {
          setMessageReceiverUserDetails(user);
        }
      });
    }
  }, [chatData]);

  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      chats,
      chatBoxRef,
      chatNotifData,
      selectedFile,
      setSelectedFile,
      messageReceiverUserDetails,
      setMessageReceiverUserDetails
    }
  }, [
    chats,
    chatBoxRef,
    chatNotifData,
    selectedFile,
    setSelectedFile,
    messageReceiverUserDetails,
    setMessageReceiverUserDetails
  ]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within useChat context")
  }
  return context;
};

export default useChat;