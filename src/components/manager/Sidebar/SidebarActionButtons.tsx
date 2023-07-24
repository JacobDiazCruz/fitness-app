import IconButton from "@/components/global/IconButton";
import useNotification from "@/contexts/Notification/useNotification";
import { borderColor } from "@/utils/themeColors";
import { BsBell } from "react-icons/bs";

export default function SidebarActionButtons() {
  const {
    showNotification,
    setShowNotification
  }: any = useNotification();

  return (
    <div className="flex p-3 bottom-20 absolute w-full justify-between">
      <div></div>
      <IconButton 
        className={`${borderColor} border relative`}
        onClick={() => setShowNotification(!showNotification)}
      >
        <div className="bg-red-500 w-[10px] h-[10px] rounded-full absolute right-0 top-0"></div>
        <BsBell className="w-5 h-5 text-gray-400" />
      </IconButton>
    </div>
  );
};