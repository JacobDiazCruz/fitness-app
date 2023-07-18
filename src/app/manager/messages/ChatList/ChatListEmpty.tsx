import { primaryTextColor } from "@/utils/themeColors";

interface Props {
  chatsLength: number;
};

export default function ChatListEmpty({ 
  chatsLength 
}: Props) {
  return (
    <>
      {!chatsLength && (
        <div className="text-center m-auto mt-[25vh]">
          <h4 className={`${primaryTextColor} font-semibold text-[18px]`}>
            No messages yet
          </h4>
          <p className={`${primaryTextColor} font-light text-[14px]`}>
            Start by messaging the people you know
          </p>
        </div>
      )}
    </>
  );
}