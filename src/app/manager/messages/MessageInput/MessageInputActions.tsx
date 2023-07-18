import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { ImageIcon, SmileyIcon } from "@/components/global/Icons";
import useMessageSender from "@/contexts/Message/useMessageSender";
import { primaryTextColor } from "@/utils/themeColors";

export default function MessageInputActions({
  type = null,
  newReceiver,
  roomId = null
}: {
  type?: string | null;
  newReceiver?: any;
  roomId?: string | null;
}) {
  const {
    handleFileChange,
    sendMessage
  }: any = useMessageSender();

  return (
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
          onClick={(e: any) => sendMessage(e, type, newReceiver, roomId)}
        >
          Send
        </Button>
      </div>
    </div>
  );
}