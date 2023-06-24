import { uploadFiles } from "@/api/Exercise";
import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { CloseIcon, ImageIcon, SmileyIcon } from "@/components/global/Icons";
import { fieldBgColor, primaryBgColor, primaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMutation } from "react-query";

export default function MessageInput({
  uploadFilesMutation,
  socket,
  roomId,
  accessToken,
  receiverId
}: any) {
  const messageFieldRef = useRef();
  const messageField = messageFieldRef.current;

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

  const handleUploadFiles = async (messageData) => {
    try {
      const formData = new FormData();
      initialFilesList.forEach((file) => {
        formData.append('files', file)
      });

      // call upload files mutation
      setInitialFilesList([]);
      const filesRes = await uploadFilesMutation.mutateAsync(formData);

      // call add exercise mutation
      if(filesRes.data.length) {
        messageData.files = filesRes.data;
        socket.emit("privateMessage", messageData);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const invokeEnterKey = (e) => {
    const {key, shiftKey} = e;
    if (key === "Enter") {
        if (shiftKey) {
          return;
        }
      sendMessage(e);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // validate if message and files are empty
    if(!messageField.innerText && !initialFilesList?.length) {
      return;
    }

    // Example: Send a private message
    const messageData = {
      roomId,
      accessToken,
      receiverId,
      message: messageField.innerHTML.trim(),
      files: []
    };

    // send private chat and message will also be created with the receiver
    messageField.innerHTML = "";
    socket.emit("privateMessage", messageData);

    // upload files if there are any
    if(initialFilesList?.length) {
      handleUploadFiles(messageData)
    }
  };

  return (
    <div className="relative w-full h-[60px]">
      <div className={`${primaryBgColor} w-full p-3 relative flex gap-[13px]`}>
        {initialFilesList?.map((file, index) => (
          <div className="h-[45px] w-[45px] bg-gray-200 relative rounded-md">
            <button
              onClick={() => {
                handleRemoveFile(index)
              }} 
              className="w-[25px] h-[25px] right-[-8px] mt-[-10px] z-[100] absolute bg-white rounded-full border border-solid border-neutral-300"
            >
              <CloseIcon className="w-4 h-4 m-auto text-neutral-950" />
            </button>
            <div className="h-[45px] w-[45px] bg-gray-200 rounded-md overflow-hidden">
              <Image
                alt="Uploaded Image"
                src={URL.createObjectURL(file)}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          </div>
        ))}
      </div>
      {/* Message input field */}
      <div 
        ref={messageFieldRef}
        className={`
          ${fieldBgColor}
          ${primaryTextColor}
          text-[14px]
          h-[60px] overflow-auto border-solid border rounded-lg p-3
        `}
        onKeyDown={invokeEnterKey}
        contentEditable
      ></div>

      {/* Action buttons */}
      <div className="flex justify-between mt-2">
        <div className="ml-2">
          <input 
            className="invisible h-[0px] w-[0]" 
            type="file" 
            name="file"
            id="file"
            onChange={handleFileChange}
            multiple
          />
          <IconButton>
            <label for="file" className="cursor-pointer">
              <ImageIcon className={`${primaryTextColor} w-8 h-8`} />
            </label>
          </IconButton>
          <IconButton>
            <SmileyIcon className={`${primaryTextColor} w-8 h-8`} />
          </IconButton>
        </div>
        <div>
          <Button 
            variant="contained"
            onClick={sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}