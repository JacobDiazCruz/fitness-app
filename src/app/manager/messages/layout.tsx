import PaddedWrapper from "@/components/global/PaddedWrapper";
import Header from "../Header";
import { primaryTextColor } from "@/utils/themeColors";

export default function MessagesLayout({
  children
}) {
  return (
    <div>
      <div className="h-[10vh] px-8 flex items-center">
        <h5 className={`${primaryTextColor} text-[22px] text-medium`}>
          Messages
        </h5>
      </div>
      {children}
    </div>
  );
}