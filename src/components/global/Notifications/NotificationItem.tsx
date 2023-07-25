import { borderColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Button from "../Button";

export default function NotificationItem() {
  return (
    <div className={`${borderColor} item border-b last:border-none flex p-5 gap-[15px] overflow-hidden`}>
      <div className="w-12 h-12 overflow-hidden rounded-full">
        <img 
          src={localStorage?.getItem('thumbnailImage') ?? ""} 
          className="object-cover w-full h-full" 
        />
      </div>
      <div>
        <div className={`${primaryTextColor} text-[14px] mt-1 line-clamp-3 w-[260px]`}>
          <b>Jacob</b> has requested for a coaching a coaching a coachinga coachinga coaching a coaching
        </div>
        <div className={`${tertiaryTextColor} text-[12px] mt-1`}>
          20 hours ago
        </div>
        <div className="mt-3">
          <Button variant="outlined" className="mr-3">
            Decline
          </Button>
          <Button>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}