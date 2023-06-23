import Button from "@/components/global/Button";
import IconButton from "@/components/global/IconButton";
import { CloseIcon, ImageIcon, SmileyIcon } from "@/components/global/Icons";
import { fieldBgColor, primaryBgColor, primaryTextColor } from "@/utils/themeColors";

interface Props {
  handleSendMessage: () => void;
};

export default function MessageInput({
  handleSendMessage
}: Props) {
  return (
    <div className="relative w-full h-[60px]">
      <div className={`${primaryBgColor} w-full p-3 relative flex gap-[10px]`}>
        <div className="h-[45px] w-[45px] bg-gray-200 relative rounded-md">
          <button className="w-[25px] h-[25px] right-[-8px] mt-[-10px] absolute bg-white rounded-full border border-solid border-neutral-300">
            <CloseIcon className="w-4 h-4 m-auto" />
          </button>
          <div className="h-[45px] w-[45px] bg-gray-200 rounded-md overflow-hidden">
            Image
          </div>
        </div>
        <div className="h-[45px] w-[45px] bg-gray-200 relative rounded-md">
          <button className="w-[25px] h-[25px] right-[-8px] mt-[-10px] absolute bg-white rounded-full border border-solid border-neutral-300">
            <CloseIcon className="w-4 h-4 m-auto" />
          </button>
          <div className="h-[45px] w-[45px] bg-gray-200 rounded-md overflow-hidden">
            Image
          </div>
        </div>
      </div>
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