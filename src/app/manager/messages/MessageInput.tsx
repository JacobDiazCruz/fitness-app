import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { ImageIcon, SmileyIcon } from "@/components/global/Icons";
import { fieldBgColor, primaryTextColor } from "@/utils/themeColors";

interface Props {
  handleSendMessage: () => void;
};

export default function MessageInput({
  handleSendMessage
}: Props) {
  return (
    <div className="relative w-full h-[60px]">

      {/* Message input field */}
      <div 
        className={`
          ${fieldBgColor}
          ${primaryTextColor}
          text-[14px]
          h-[60px] overflow-auto border-solid border rounded-lg p-3
        `}
        onKeyDown={handleSendMessage}
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
            // onChange={handleFileChange}
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
          <Button variant="contained">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}