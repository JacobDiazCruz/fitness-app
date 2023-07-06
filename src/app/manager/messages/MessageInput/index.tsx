import { uploadFiles } from "@/api/Exercise";
import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { CloseIcon, ImageIcon, PlayIcon, SmileyIcon } from "@/components/global/Icons";
import useChat from "@/contexts/Message/useChat";
import useMessageSender from "@/contexts/Message/useMessageSender";
import { borderColor, fieldBgColor, primaryBgColor, primaryTextColor, secondaryBgColor } from "@/utils/themeColors";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { socket } from "@/utils/socket";
import useLocalStorage from "@/hooks/useLocalStorage";

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