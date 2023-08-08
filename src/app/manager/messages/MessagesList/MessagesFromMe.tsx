import useChat from "@/store/Message/useChat";
import useMessageSender from "@/store/Message/useMessageSender";
import { Message } from "@/utils/types";
import FilesDisplay from "../FilesDisplay";

interface Props {
  message: Message;
};

export default function MessagesFromMe ({
  message
}: Props) {
  const {
    selectedFile,
    setSelectedFile
  }: any = useChat();
  const { uploadFilesMutation }: any = useMessageSender();

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
          dangerouslySetInnerHTML={{ __html: message?.message }}
          className="dark:bg-blue-500 dark:text-neutral-50 bg-neutral-800 text-gray-50 py-3 px-4 rounded-xl lg:max-w-[500px]"
        />
      )}
    </div>
  );
};