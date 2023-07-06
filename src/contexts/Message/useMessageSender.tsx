'use client';

import { uploadFiles } from "@/api/Exercise";
import { useMutation } from "react-query";
import { createContext, useContext, useMemo, useEffect, ReactNode, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import useChat from "./useChat";
const MessageSenderContext = createContext(null);
import { socket } from "@/utils/socket";

export const MessageSenderProvider = ({ children }: { children: ReactNode }) => {
  const messageFieldRef = useRef();
  const messageField = messageFieldRef.current;
  const params = useParams();
  const accessToken = useLocalStorage("accessToken");
  const {
    messageReceiverUserDetails
  }: any = useChat()!;

  // upload files to cloudinary request
  const uploadFilesMutation = useMutation(uploadFiles, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const [initialFilesList, setInitialFilesList] = useState([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files);
    setInitialFilesList(prevFiles => [...prevFiles, ...newFiles]);
  
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    const filteredFiles = initialFilesList
      .filter((file, fileIndex) => fileIndex !== index);
    setInitialFilesList(filteredFiles);
  };

  const handleUploadFiles = async (privateMessageData, type) => {
    try {
      const formData = new FormData();
      initialFilesList.forEach((file) => {
        formData.append('files', file)
      });

      // call upload files mutation
      setInitialFilesList([]);
      const filesRes = await uploadFilesMutation.mutateAsync(formData);

      // call add exercise mutation
      if(filesRes?.data?.length) {
        privateMessageData.files = filesRes.data;
        socket.emit("privateMessage", {
          ...privateMessageData,
          type
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  const invokeEnterKey = (e, type, newReceiver, roomId) => {
    const {key, shiftKey} = e;
    if (key === "Enter") {
      if (shiftKey) {
        return;
      }
      sendMessage(e, type, newReceiver, roomId);
    }
  };

  const sendMessage = (e, type, newReceiver, roomId) => {
    e.preventDefault();

    // validate if message and files are empty
    if(!messageFieldRef.current.innerText && !initialFilesList?.length) {
      return;
    }

    // Example: Send a private message
    const privateMessageData = {
      roomId,
      accessToken,
      newReceiver,
      type: !initialFilesList?.length && type,
      receiverId: messageReceiverUserDetails.userId,
      message: messageFieldRef.current.innerHTML.trim(),
      files: []
    };

    // send private chat and message will also be created with the receiver
    messageFieldRef.current.innerHTML = "";
    
    if(privateMessageData.message) {
      socket.emit("privateMessage", privateMessageData);
    }
    
    // upload files if there are any
    if(initialFilesList?.length) {
      handleUploadFiles(privateMessageData, type)
    }
  };

  const getFile = (file: string) => {
    const isVideo = file.type.includes('video');
    const isImage = file.type.includes('image');

    if (isVideo) {
      return "video";
    } else if (isImage) {
      return "image";
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const items = Array.from(clipboardData.items);
      const imageFiles = items
        .filter(item => item.type.startsWith('image/'))
        .map(item => item.getAsFile());
  
      if (imageFiles.length > 0) {
        setInitialFilesList(prevFiles => [...prevFiles, ...imageFiles]);
  
        // Clear the content of the div after handling the pasted images
        if (messageFieldRef.current) {
          // Temporarily disable contentEditable
          messageFieldRef.current.contentEditable = 'false';
  
          // Execute the 'delete' command to remove the pasted image
          document.execCommand('delete');
  
          // Re-enable contentEditable
          messageFieldRef.current.contentEditable = 'true';
        }
      }
    }
  };
  
  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      uploadFilesMutation,
      handleFileChange,
      handleRemoveFile,
      handlePaste,
      initialFilesList,
      setInitialFilesList,
      getFile,
      invokeEnterKey,
      messageFieldRef,
      messageField,
      sendMessage,
      handleUploadFiles
    }
  }, [
    uploadFilesMutation,
    handleFileChange,
    handleRemoveFile,
    handlePaste,
    initialFilesList,
    setInitialFilesList,
    getFile,
    invokeEnterKey,
    messageFieldRef,
    messageField,
    sendMessage,
    handleUploadFiles
  ]);

  return (
    <MessageSenderContext.Provider value={value}>
      {children}
    </MessageSenderContext.Provider>
  );
};

const useMessageSender = () => {
  const context = useContext(MessageSenderContext)
  if (context === undefined) {
    throw new Error("useMessageSender must be used within useMessageSender context")
  }
  return context;
};

export default useMessageSender;