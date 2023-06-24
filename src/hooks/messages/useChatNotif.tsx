import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

interface Props {
  myUserId: string;
};

interface ChatNotif {
  receiverId: string;
  message: string;
  createdAt: any;
};

export default function useChatNotif() {
  const myUserId = useLocalStorage("userId");

  const [chatNotifData, setChatNotifData] = useState<ChatNotif>({
    receiverId: "",
    message: "",
    createdAt: null
  });

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

  return {
    chatNotifData
  };
}