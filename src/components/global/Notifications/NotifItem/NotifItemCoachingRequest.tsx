import { addClient } from "@/api/Client";
import { getProfile } from "@/api/Profile";
import useAlert from "@/contexts/Alert";
import useNotification from "@/contexts/Notification/useNotification";
import useGetTimeDiff from "@/hooks/useGetTimeDiff";
import { borderColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import Button from "../../Button";

export default function NotifItemCoachingRequest({
  planId,
  notificationId,
  order
}: any) {

  const { dispatchAlert }: any = useAlert();
  const { 
    refetchNotifications,
    editNotifOrderStatusMutation
  }: any = useNotification();

  const [triggerAddClient, setTriggerAddClient] = useState<boolean>(false);

  const addClientMutation = useMutation(addClient, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: `${order.customerDetails.name} is now your client.`
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const {
    data: customerProfile,
    refetch: refetchCustomerProfile
  } = useQuery('customerProfile', () => getProfile({ 
    userId: order.customerDetails.userId
  }), {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const submitEditStatusAction = async (status: "DECLINED" | "ACCEPTED") => {
    await editNotifOrderStatusMutation.mutateAsync({
      orderId: order._id,
      notificationId,
      status
    });

    refetchNotifications();

    if(status === "ACCEPTED") {
      refetchCustomerProfile();
      setTriggerAddClient(true);
    }
  };

  useEffect(() => {
    if(customerProfile && triggerAddClient) {
      addClientMutation.mutateAsync({
        planId,
        firstName: customerProfile?.firstName,
        lastName: customerProfile?.lastName,
        email: customerProfile?.email,
        contact: customerProfile?.contact
      });

      setTriggerAddClient(false);
    }
  }, [customerProfile]);

  const CoachingRequestActions = () => {
    switch(order.status) {
      case 'PENDING':
        return (
          <>
            <Button
              variant="outlined" 
              className="mr-3"
              loading={editNotifOrderStatusMutation.isLoading}
              onClick={() => {
                submitEditStatusAction("DECLINED");
              }}
            >
              Decline
            </Button>
            <Button
              loading={editNotifOrderStatusMutation.isLoading}
              onClick={() => {
                submitEditStatusAction("ACCEPTED");
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
            <MdClose className="text-red-600 w-5 h-4"/>
            Declined
          </p>
        );
      default:
        return <></>
    }
  };

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
        <div className="mt-2">
          <CoachingRequestActions />
        </div>
      </div>
    </div>
  );
};