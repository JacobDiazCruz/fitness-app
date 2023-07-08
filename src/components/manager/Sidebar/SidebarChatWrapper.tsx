import { ChatIcon } from "@/components/global/Icons";
import useChat from "@/contexts/Message/useChat";

export default function SidebarChatWrapper() {
  const { chatNotifData }: any = useChat();
  
  return (
    <div className="relative">
      {chatNotifData?.receiverId && (
        <div className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-0 top-0"></div>
      )}
      <ChatIcon className="w-6 h-6 text-gray-400" />
    </div>
  );
}