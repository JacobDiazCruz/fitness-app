import { listChats } from "@/api/Chat";
import { useEffect } from "react"
import { useQuery } from "react-query";
import io from "socket.io-client";

// Establish a connection to the socket server
const socket = io("http://localhost:4000");

export default function useChat() {
  const { 
    isLoading: isLoadingChats, 
    isError: isErrorChats,
    data: chats,
    error: errorChats
  } = useQuery('chats', listChats);

  const sendMessage = ({
    e,
    roomId,
    accessToken,
    receiverId
  }) => {
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

  useEffect(() => {
    console.log("chats", chats)
  }, [chats])

  return {
    chats,
    socket,
    sendMessage
  }
};