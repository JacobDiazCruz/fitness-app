'use client';

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon, LoadingIcon, SmileyIcon } from "@/components/global/Icons";
import Header from "../../Header";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";
import { useQuery } from "react-query";
import { listMessages } from "@/api/Message";
import ChatList from "../ChatList";
import { getChat } from "@/api/Chat";
import IconButton from "@/components/global/IconButton";
import MessageInput from "../MessageInput";
import FilesDisplay from "../FilesDisplay";
import { socket } from "@/utils/socket";
import useChatNotif from "@/hooks/messages/useChatNotif";
import useChat from "@/hooks/messages/useChat";
import useMessageSender from "@/hooks/messages/useMessageSender";
import MessagesList from "../MessagesList";

export default function Messages() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // your account's essentials
  const accessToken = useLocalStorage("accessToken");
  const myUserId = useLocalStorage("userId");
  
  // hooks
  const { chatNotifData } = useChatNotif();
  const { chatBoxRef } = useChat();
  const { uploadFilesMutation } = useMessageSender();
  
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
  const [messagesLimit, setMessagesLimit] = useState<number>(20);

  // state messages
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [remountKey, setRemountKey] = useState(0);
  const [forceScrollBottom, setForceScrollBottom] = useState(true);
  const [firstMount, setFirstMount] = useState(true);

  useEffect(() => {
    // join room
    socket.emit("joinRoom", params.id);

    // Handle incoming messages
    socket.on("message", (messageData) => {
      const { roomId, message = "", files, createdAt} = messageData;
      console.log("Received message:", message, files);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      
      // Set force scroll to the bottom after sending a message
      setForceScrollBottom(true);
    });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the container when a new message is added
    if(forceScrollBottom) {
      chatBoxRef.current.scrollTop = 
        chatBoxRef.current.scrollHeight;
      setForceScrollBottom(false);
    } else if (firstMount) {
      // Scroll to the bottom of the container on first mount of component
      chatBoxRef.current.scrollTop = 
        chatBoxRef.current.scrollHeight;
      setFirstMount(false);
    }
  }, [messages]);

  // list messages query
  const { 
    isLoading: isLoadingMessages,
    isFetching: isFetchingMessages,
    isError: isErrorMessages,
    data: messagesData,
    refetch: refetchMessagesData
  } = useQuery('messages', () => listMessages({ 
    roomId: params.id,
    limit: messagesLimit
  }), {
    refetchOnMount: true,
  });

  /**
   * @Purpose To refetch the messages data everytime the url param updates
   */
  useEffect(() => {
    refetchMessagesData();
  }, [params.id]);

  /**
   * @Purpose To set the requested messages data on messages state and display it on the UI
   */
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
   * @Purpose To fetch the previous messages data upon scrolling to the -
   * upmost part of the parent messages container.
   * FIX THIS BUGGY
   */
   useEffect(() => {
    if(!firstMount) {
      let prevScrollHeight = 0;
      let prevScrollTop = 0;
    
      function handleScroll() {
        const chatBoxElement = chatBoxRef.current;
        if (chatBoxElement.scrollTop <= 50) {
          prevScrollHeight = chatBoxElement.scrollHeight;
          prevScrollTop = chatBoxElement.scrollTop;
    
          setMessagesLimit((prevLimit) => prevLimit + 10);
          refetchMessagesData();
          chatBoxRef.current.scrollTop = 250 - chatBoxRef.current.scrollTop
        }
      }
    
      const chatBoxElement = chatBoxRef.current;
      chatBoxElement.addEventListener("scroll", handleScroll);
    
      return () => {
        chatBoxElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [messagesLimit, firstMount]);
  
  /**
   * @Purpose To set chat details on the chatbox whenever chatData is available
   * @Note This is used to display the thumbnailImage and get the profile link of the sender and receiver.
   */
  useEffect(() => {
    if(chatData) {
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
    <div key={remountKey} className="messages-page h-[100vh] overflow-hidden">
      <h5 className={`${primaryTextColor} text-[22px] text-medium mb-5`}>
        Messages
      </h5>
      <div className="flex h-full w-full">
        <ChatList />

        {/* Chat */}
        <div className={`${primaryBgColor} ${borderColor}' w-full relative border-t border-t-solid`}>
          <div ref={chatBoxRef} className="relative overflow-auto h-[70vh] p-5">
            {isFetchingMessages && (
              <LoadingIcon className="w-4 h-4 m-auto" />
            )}
            <MessagesList 
              messages={messages}
              otherChatDetails={otherChatDetails}
            />
          </div>
          <MessageInput
            socket={socket}
            roomId={params.id}
            accessToken={accessToken}
            receiverId={otherChatDetails?.userId}
          />
        </div>
      </div>
    </div>
  );
}