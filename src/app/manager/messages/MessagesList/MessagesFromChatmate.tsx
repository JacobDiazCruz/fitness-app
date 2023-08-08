import useChat from "@/store/Message/useChat";
import Image from "next/image";
import FilesDisplay from "../FilesDisplay";

export default function MessagesFromChatmate({
  message
}: {
  message: any;
}) {
  const {
    setSelectedFile,
    uploadFilesMutation,
    messageReceiverUserDetails
  }: any = useChat();

  return (
    <div className="flex gap-[12px] mt-3">
      <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
        {messageReceiverUserDetails?.thumbnailImage && (
          <Image
            alt="Other Chat Image"
            src={messageReceiverUserDetails?.thumbnailImage}
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
            className="dark:bg-darkTheme-900 dark:text-neutral-50 bg-neutral-100 text-gray-900 py-3 px-4 rounded-xl lg:max-w-[500px]"
          />
        )}
      </div>
    </div>
  );
};