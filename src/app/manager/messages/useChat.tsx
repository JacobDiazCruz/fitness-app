import { listChats } from "@/api/Chat";
import { uploadFiles } from "@/api/Exercise";
import { useRef, useEffect } from "react"
import { useMutation, useQuery } from "react-query";
import io from "socket.io-client";

// Establish a connection to the socket server
const socket = io("http://localhost:4000");

export default function useChat() {
  const chatBoxRef = useRef(null);

  const { 
    isLoading: isLoadingChats, 
    isError: isErrorChats,
    data: chats,
    error: errorChats
  } = useQuery('chats', listChats);

  // upload files to cloudinary request
  const uploadFilesMutation = useMutation(uploadFiles, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    console.log("chats", chats);
  }, [chats]);

  return {
    chats,
    socket,
    chatBoxRef,
    uploadFilesMutation
  }
};