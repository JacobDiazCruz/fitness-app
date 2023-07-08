'use client';

import { useEffect, useState } from "react";
import { LoadingIcon } from "@/components/global/Icons";
import { borderColor } from "@/utils/themeColors";
import { useParams } from "next/navigation";
import { Message } from "@/utils/types";
import { useQuery } from "react-query";
import { listMessages } from "@/api/Message";
import ChatList from "../../../../components/manager/messages/ChatList";
import { socket } from "@/utils/socket";
import useChat from "@/contexts/Message/useChat";
import MessageInput from "@/components/manager/messages/MessageInput";
import MessagesList from "@/components/manager/messages/MessagesList";

export default function Messages() {
  // hooks
  const params = useParams();
  const { chatBoxRef }: any = useChat();
  
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

  return (
    <div key={remountKey} className="messages-page">
      <div className="relative h-[90vh] flex">
        <ChatList />

        {/* Chat */}
        <div className={`w-full overflow-hidden ${borderColor} border-l relative px-6 py-3 border-t border-solid flex flex-col`}>
          <div
            ref={chatBoxRef} 
            className="relative overflow-auto flex-grow px-4"
          >
            {isFetchingMessages && (
              <LoadingIcon className="w-4 h-4 m-auto" />
            )}
            <MessagesList messages={messages} />
          </div>
          <MessageInput
            uploads={<MessageInput.Uploads />}
            field={<MessageInput.Field roomId={params.id} />}
            actions={<MessageInput.Actions roomId={params.id} />}
          />
        </div>
      </div>
    </div>
  );
};