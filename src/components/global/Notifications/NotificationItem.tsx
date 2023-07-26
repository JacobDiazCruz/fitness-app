import useNotification from "@/contexts/Notification/useNotification";
import useGetTimeDiff from "@/hooks/useGetTimeDiff";
import { borderColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { BsCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Button from "../Button";

export default function NotificationItem({
  notif
}: any) {
  const { editNotifOrderStatusMutation }: any = useNotification();

  const { type, contents, _id } = notif;
  const { order } = contents;

  const submitEditStatusAction = (status: "DECLINED" | "ACCEPTED") => {
    editNotifOrderStatusMutation.mutateAsync({
      orderId: order._id,
      notificationId: _id,
      status
    });
  };

  const CoachingRequestActions = () => {
    switch(order.status) {
      case 'PENDING':
        return (
          <>
            <Button 
              variant="outlined" 
              className="mr-3"
              onClick={() => {
                submitEditStatusAction("DECLINED")
              }}
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                submitEditStatusAction("ACCEPTED")
              }}
            >
              Accept
            </Button>
          </>
        );
      case 'ACCEPTED':
        return (
          <p className={`text-[14px] text-green-600 flex items-center`}>
            <BsCheck className="text-green-600 w-6 h-6"/>
            Accepted
          </p>
        );
      case 'DECLINED':
        return (
          <p className={`text-[14px] text-red-600 flex items-center`}>
            <MdClose className="text-red-600 w-6 h-6"/>
            Declined
          </p>
        );
      default:
        return <></>
    }
  }

  switch(type) {
    case 'COACHING_REQUEST':
      return (
        <div className={`${borderColor} item border-b last:border-none flex p-5 gap-[15px] overflow-hidden`}>
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              src={order.customerDetails.thumbnailImage} 
              className="object-cover w-full h-full" 
            />
          </div>
          <div>
            <div className={`${primaryTextColor} text-[14px] mt-1 line-clamp-3 w-[260px]`}>
              <b>{order.customerDetails.name}</b> 
              &nbsp;is requesting to become your client and has subscribed to your Basic plan.
            </div>
            <div className={`${tertiaryTextColor} text-[12px] mt-1`}>
              {useGetTimeDiff(order.createdAt)}
            </div>
            <div className="mt-3">
              <CoachingRequestActions />
            </div>
          </div>
        </div>
      );
    default:
      return <></>;
  };
};