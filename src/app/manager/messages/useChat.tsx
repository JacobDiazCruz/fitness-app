import { listChats } from "@/api/Chat";
import { useEffect } from "react"
import { useQuery } from "react-query";

export default function useChat() {
  const { 
    isLoading, 
    isError,
    data: chats,
    error
  } = useQuery('chats', listChats, {
    refetchOnMount: true
  });

  return {
    chats
  }
};