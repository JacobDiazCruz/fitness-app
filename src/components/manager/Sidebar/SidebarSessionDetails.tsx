import { listClients } from "@/api/Client";
import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useQuery } from "react-query";

export default function SidebarSessionDetails() {
  // list coaching plans
  const { 
    isLoading, 
    isError,
    data: clients = [],
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  if(isLoading) {
    return <></>;
  }

  return (
    <div className={`${borderColor} bg-neutral-200 dark:bg-neutral-800 border p-3 rounded-lg w-[90%] m-auto`}>
      <div className="flex gap-[10px]">
        <div className="rounded-full w-[30px] h-[30px] relative overflow-hidden">
          {clients[0].client.thumbnailImage && (
            <Image
              alt="Trainer Image"
              src={clients[0].client.thumbnailImage || "/"}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        <div>
          <h4 className={`${primaryTextColor} text-[12px]`}>John Doe</h4>
          <p className={`${tertiaryTextColor} text-[10px]`}>Trainer</p>
        </div>
      </div>
      <p className={`${secondaryTextColor} text-[13px] mt-2`}>
        30 sessions remaining
      </p>
    </div>
  );
}