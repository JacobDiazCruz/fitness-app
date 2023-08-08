import useNotification from "@/store/Notification/useNotification";
import { borderColor, primaryBgColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { MdClose } from "react-icons/md";
import IconButton from "../IconButton";
import NotifItem from "./NotifItem";

export default function Notifications() {
  const {
    notifications,
    showNotification,
    setShowNotification
  }: any = useNotification();

  if(!showNotification) return <></>;

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full dark:dark:bg-neutral-600 bg-darkTheme-950 opacity-70 z-[490]"
        onClick={() => setShowNotification(!showNotification)}
      ></div>

      <div className={`${secondaryBgColor} ${borderColor} border w-[400px] h-[100vh] fixed z-[500] left-[236px]`}>
        <IconButton 
          className={`${borderColor} ${primaryBgColor} border absolute -right-4 top-5`}
          onClick={() => setShowNotification(!showNotification)}
        >
          <MdClose className={`${tertiaryTextColor}`}/>
        </IconButton>
        <div className={`${borderColor} p-7`}>
          <h5 className={`${primaryTextColor} text-[20px] text-medium`}>
            Notifications
          </h5>
        </div>
        <div className={`${borderColor} flex border-b pb-3 px-7 gap-[20px]`}>
          <div className={`${tertiaryTextColor} w-fit cursor-pointer text-[14px] flex gap-[10px]`}>
            All
            {notifications.length ? (
              <div className={`${primaryTextColor} font-semibold px-2 bg-[#ef4822] rounded-sm w-fit`}>
                {notifications?.length}
              </div>
            ) : <></>}
          </div>
        </div>

        {/* List */}
        <div className="w-full h-full overflow-auto">
          {notifications.map((notif: any) => (
            <NotifItem notif={notif} />
          ))}
        </div>
      </div>
    </>
  );
};