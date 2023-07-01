import Modal from "@/components/global/Modal";
import useMessageSender from "@/hooks/messages/useMessageSender";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilesDisplay from "./FilesDisplay";

interface Props {
  messages: Array<any>;
  otherChatDetails: any;
};

const FileModal = ({ 
  selectedFile, 
  onClose 
}: {
  selectedFile: string;
  onClose?: () => void;
}) => {

  return (
    <Modal className="w-fit h-fit" onClose={onClose}>
      {selectedFile && (
        <img
          alt="Other Chat Image"
          className="w-auto h-auto"
          src={selectedFile}
          style={{ objectFit: "cover" }}
          fill
        />
      )}
    </Modal>
  );
}

export default function MessagesList({
  messages,
  otherChatDetails
}: Props) {
  const myUserId = useLocalStorage("userId");
  const { uploadFilesMutation } = useMessageSender();

  const [selectedFile, setSelectedFile] = useState<string>("");

  return (
    <>
      {messages?.map((message: Message, index: number) => {
        if(message.senderId !== myUserId) {
          return (
            // Other
            <div className="flex gap-[12px] mt-3">
              <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
                {otherChatDetails?.thumbnailImage && (
                  <Image
                    alt="Other Chat Image"
                    src={otherChatDetails?.thumbnailImage}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                )}
              </div>
              <div className={`rounded-xl lg:max-w-[500px]`}>
                {message?.files?.length ? (
                  <FilesDisplay
                    files={message?.files}
                    isLoading={uploadFilesMutation?.isLoading}
                    setSelectedFile={setSelectedFile}
                  />
                ) : message?.message && (
                  <div 
                    dangerouslySetInnerHTML={{__html: message?.message}}
                    className="dark:bg-darkTheme-900 dark:text-neutral-50 bg-neutral-800 text-gray-50 py-3 px-4 rounded-xl lg:max-w-[500px]"
                  />
                )}
              </div>
            </div>
          );
        } else {
          // ME
          return (
            <div className="mt-1 flex flex-row-reverse">
              {message?.files?.length ? (
                <FilesDisplay
                  files={message?.files}
                  isLoading={uploadFilesMutation?.isLoading}
                  setSelectedFile={setSelectedFile}
                />
              ) : message?.message && (
                <div
                  dangerouslySetInnerHTML={{__html: message?.message}}
                  className="dark:bg-blue-500 dark:text-neutral-50 bg-neutral-800 text-gray-50 py-3 px-4 rounded-xl lg:max-w-[500px]"
                />
              )}
            </div>
          );
        }
      })}
      {selectedFile && (
        <FileModal 
          selectedFile={selectedFile}
          onClose={() => setSelectedFile("")}
        />
      )}
    </>
  );
}