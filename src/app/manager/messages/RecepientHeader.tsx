import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";

export default function RecepientHeader({
  receiverProfile
}: {
  receiverProfile: any;
}) {
  return (
    <div className={`${primaryBgColor} ${borderColor} z-[100] flex w-full py-5 mb-6 sticky top-0 border-b border-b-solid`}>
      <div className="rounded-full relative overflow-hidden w-10 h-10">
        {receiverProfile?.profileImage?.thumbnailImage && (
          <Image
            alt="Trainer Image"
            src={receiverProfile?.profileImage?.thumbnailImage}
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </div>
      <div className="ml-3">
        <h4 className={`${primaryTextColor} font-semibold text-[14px]`}>
          {receiverProfile?.firstName} {receiverProfile?.lastName}
        </h4>
        <p className={`${secondaryTextColor} font-light text-[12px]`}>
          {receiverProfile?.email}
        </p>
      </div>
    </div>
  );
}