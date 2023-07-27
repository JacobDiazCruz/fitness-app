import NotifItemCoachingRequest from "./NotifItemCoachingRequest";

export default function NotifItem({
  notif
}: any) {
  const { type, contents, _id } = notif;
  const { order } = contents;

  switch(type) {
    case 'COACHING_REQUEST':
      return (
        <NotifItemCoachingRequest 
          notificationId={_id}
          order={order}
        />
      );
    default:
      return <></>;
  };
};