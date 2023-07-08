import { primaryBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../Icons";

interface CoachDetailsHeaderProps {
  thumbnailImage: string;
  fullName: string;
};

export default function CoachDetailsHeader({
  thumbnailImage,
  fullName
}: CoachDetailsHeaderProps) {

  const router = useRouter();
  
  return (
    <div className={`${primaryBgColor} z-[100] flex w-full py-5 mb-6 sticky top-[48px] md:top-0`}>
      <button
        className="mr-5"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className={`w-4 h-4 ${primaryTextColor}`} />
      </button>
      <div className="rounded-full relative overflow-hidden w-10 h-10">
        {thumbnailImage && (
          <Image
            alt="Trainer Image"
            src={thumbnailImage}
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </div>
      <div className="ml-3">
        <h4 className={`${primaryTextColor} font-semibold text-[14px]`}>
          {fullName}
        </h4>
        <p className={`${secondaryTextColor} font-light text-[12px]`}>
          Certified Online Trainer
        </p>
      </div>
    </div>
  );
};