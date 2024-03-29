import useGetTimeDiff from "@/hooks/useGetTimeDiff";
import useLocalStorage from "@/hooks/useLocalStorage";
import { borderColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ChatListItemProps {
  userDetails: any;
  lastMessageDetails: any;
  roomId: string;
  updatedAt: string;
};

export default function ChatListItem ({
  userDetails,
  lastMessageDetails,
  roomId,
  updatedAt
}: ChatListItemProps) {

  const router = useRouter();
  const params = useParams();

  // get initial receiverId
  const myUserId = useLocalStorage("userId");

  return (
    <div
      onClick={() => router.push(`/manager/messages/${roomId}`)}
      className={`
        ${borderColor}
        ${params.id === roomId && 'dark:bg-darkTheme-900'}
        px-8 py-4 border-b border-b-solid cursor-pointer
      `}
    >
      <div className="flex gap-[12px]">
        <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
          {userDetails.thumbnailImage && (
            <Image
              alt="Trainer Image"
              src={userDetails.thumbnailImage}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        <div className="flex justify-between w-[80%]">
          <div>
            <h4 className={`${primaryTextColor} font-semibold`}>
              {userDetails.firstName} {userDetails.lastName}
            </h4>
            <p className={`${secondaryTextColor} truncate w-[180px] font-light text-[14px]`}>
              {lastMessageDetails?.senderId === myUserId ? "You: " : `${userDetails.firstName}: `}
              {lastMessageDetails?.message}
            </p>
          </div>
          <p className={`${secondaryTextColor} text-[12px]`}>
            {useGetTimeDiff(updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};