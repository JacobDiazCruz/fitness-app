import { uploadFiles } from "@/api/Exercise";
import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { CloseIcon, ImageIcon, PlayIcon, SmileyIcon } from "@/components/global/Icons";
import useMessageSender from "@/hooks/messages/useMessageSender";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryBgColor } from "@/utils/themeColors";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMutation } from "react-query";

interface Props {
  socket: any;
  roomId: string;
  type: any;
  accessToken: string;
  receiverId: string;
  newReceiver: any;
};

export default function MessageInput({
  socket,
  roomId,
  type = null,
  accessToken,
  receiverId,
  newReceiver = null
}: Props) {
  const messageFieldRef = useRef();
  const messageField = messageFieldRef.current;
  const { uploadFilesMutation } = useMessageSender();

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

  const handleUploadFiles = async (privateMessageData) => {
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
    const privateMessageData = {
      roomId,
      accessToken,
      newReceiver,
      type: !initialFilesList?.length && type,
      receiverId,
      message: messageField.innerHTML.trim(),
      files: []
    };

    // send private chat and message will also be created with the receiver
    messageField.innerHTML = "";
    
    if(privateMessageData.message) {
      socket.emit("privateMessage", privateMessageData);
    }
    
    // upload files if there are any
    if(initialFilesList?.length) {
      handleUploadFiles(privateMessageData)
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

  return (
    <div className={`${primaryBgColor} relative bottom-0 w-full`}>
      {/* Uploaded Images Container */}
      {initialFilesList.length ? (
        <div className={`${primaryBgColor} ${borderColor} w-full px-3 h-[80px] top-[-80px] py-4 absolute flex gap-[13px] border-t border-t-solid`}>
          {initialFilesList?.map((file, index) => (
            <div className="h-[45px] w-[45px] bg-gray-200 relative rounded-md">
              <button
                onClick={() => {
                  handleRemoveFile(index)
                }}
                className="w-[25px] h-[25px] right-[-8px] mt-[-10px] z-[100] absolute bg-white rounded-full border border-solid border-neutral-300"
              >
                <CloseIcon className="w-4 h-4 m-auto text-darkTheme-950" />
              </button>
              {getFile(file) === "image" ? (
                <div className="h-[45px] w-[45px] bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    alt="Uploaded Image"
                    src={URL.createObjectURL(file)}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
              ) : (
                <div className="flex items-center h-[45px] w-[45px] bg-gray-500 rounded-md overflow-hidden">
                  <div className="w-[20px] h-[20px] ml-3 border border-white flex items-center rounded-full">
                    <PlayIcon className="w-3 h-3 text-white m-auto" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : <></>}

      {/* Message input field */}
      <div className="p-3">
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
          data-text="Enter text here"
          onPaste={handlePaste}
        ></div>

        {/* Action buttons */}
        <div className="flex justify-between mt-2">
          <div>
            <input 
              className="invisible h-[0px] w-[0]" 
              type="file" 
              name="file"
              id="file"
              onChange={handleFileChange}
              multiple
            />
            <IconButton>
              <label htmlFor="file" className="cursor-pointer">
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
    </div>
  );
}