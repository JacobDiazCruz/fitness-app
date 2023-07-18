import { ReactNode, } from "react";
import useMessageSender from "@/contexts/Message/useMessageSender";
import { primaryBgColor } from "@/utils/themeColors";

// child components
import MessageInputUploads from "./MessageInputUploads";
import MessageInputField from "./MessageInputField";
import MessageInputActions from "./MessageInputActions";

interface Props {
  field?: ReactNode;
  actions?: ReactNode;
  uploads?: ReactNode;
};

export default function MessageInput({
  field,
  actions,
  uploads,
}: Props) {
  const {
    initialFilesList
  }: any = useMessageSender();

  return (
    <div className={`${primaryBgColor} relative bottom-0 w-full`}>
      {/* Uploaded Images Container */}
      {initialFilesList.length && (
        <>{uploads}</>
      )}

      {/* Message input field */}
      <div className="p-3">
        {field}
        {actions}
      </div>
    </div>
  );
};

MessageInput.Field = MessageInputField;
MessageInput.Actions = MessageInputActions;
MessageInput.Uploads = MessageInputUploads;