import useMessageSender from "@/store/Message/useMessageSender";
import { fieldBgColor, primaryTextColor } from "@/utils/themeColors";

interface Props {
  type?: string | null;
  newReceiver?: any;
  roomId?: string | null;
};

export default function MessageInputField({
  type = null,
  newReceiver,
  roomId = null
}: Props) {
  const {
    messageFieldRef,
    invokeEnterKey,
    handlePaste
  }: any = useMessageSender();

  return (
    <div 
      ref={messageFieldRef}
      className={`
        ${fieldBgColor}
        ${primaryTextColor}
        text-[14px]
        h-[60px] overflow-auto border-solid border rounded-lg p-3
      `}
      onKeyDown={(e) => invokeEnterKey(e, type, newReceiver, roomId)}
      contentEditable
      data-text="Enter text here"
      onPaste={handlePaste}
    ></div>
  );
}