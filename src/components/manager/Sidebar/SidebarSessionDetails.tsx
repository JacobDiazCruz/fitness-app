import { getCurrentClientCoaching, listClients } from "@/api/Client";
import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useQuery } from "react-query";

export default function SidebarSessionDetails() {
  // list coaching plans
  const { 
    isLoading, 
    isError,
    data: coachingData,
    error
  } = useQuery('coachingData', getCurrentClientCoaching, {
    refetchOnMount: true
  });

  if(isLoading) {
    return <></>;
  }

  if(!coachingData) {
    return <></>;
  }

  return (
    <div className={`${borderColor} bg-neutral-200 dark:bg-neutral-800 border p-3 rounded-lg w-[90%] m-auto`}>
      <div className="flex gap-[10px]">
        <div className="rounded-full w-[30px] h-[30px] relative overflow-hidden">
          {coachingData.coach.thumbnailImage && (
            <Image
              alt="Trainer Image"
              src={coachingData.coach.thumbnailImage || "/"}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        <div>
          <h4 className={`${primaryTextColor} text-[12px]`}>
            {coachingData.coach.firstName} {coachingData.coach.lastName}
          </h4>
          <p className={`${tertiaryTextColor} text-[10px]`}>Coach</p>
        </div>
      </div>
      <p className={`${secondaryTextColor} text-[13px] mt-2`}>
        {coachingData.remainingSessions} sessions remaining
      </p>
    </div>
  );
}