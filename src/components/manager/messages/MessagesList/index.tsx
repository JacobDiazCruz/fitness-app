import FileModal from "@/components/global/FileModal";
import useChat from "@/contexts/Message/useChat";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/utils/types";

import MessagesFromMe from "./MessagesFromMe";
import MessagesFromChatmate from "./MessagesFromChatmate";

interface Props {
  messages: Array<any>;
};

export default function MessagesList({
  messages
}: Props) {
  const myUserId = useLocalStorage("userId");
  const {
    selectedFile,
    setSelectedFile
  }: any = useChat();

  return (
    <>
      {messages?.map((message: Message, index: number) => {
        if(message.senderId !== myUserId) {
          return <MessagesFromChatmate key={index} message={message} />;
        } else {
          return <MessagesFromMe key={index} message={message} />;
        }
      })}
      {selectedFile && (
        <FileModal 
          file={selectedFile}
          onClose={() => setSelectedFile("")}
        />
      )}
    </>
  );
};