import { listClients } from "@/api/Client";
import Button from "@/components/global/Button";
import { borderColor, primaryBgColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import useLocalStorage from "@/hooks/useLocalStorage";
import { BsFillInfoCircleFill } from "react-icons/bs";

export default function SidebarWorkoutToday() {
  const router = useRouter();
  const firstName = useLocalStorage("firstName");

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
    <div className={`fixed bottom-10 right-10 px-5 w-fit ${borderColor} ${secondaryBgColor} border p-3 rounded-lg w-[90%] m-auto`}>
      <div className="flex gap-[15px]">
        <BsFillInfoCircleFill className="w-5 h-5 text-violet-400 mt-[2px]" />
        <div>
          <h4 className={`text-violet-400 text-[16px]`}>{firstName}, you have a workout today!</h4>
          <div
            className="dark:bg-white flex items-center bg-neutral-700 cursor-pointer shadow-xl dark:border border-solid fixed items-center rounded-full w-[23px] h-[23px] absolute right-[-10px] top-[-10px] z-[999]"
          >
            <MdClose className={`dark:fill-neutral-800 fill-white w-4 h-4 m-auto`}/>
          </div>
          <div
            className={`mt-1 w-full ${tertiaryTextColor} font-light flex items-center cursor-pointer`}
            onClick={() => {
              router.push('/workout/232421');
            }}
          >
            Click here to start
            <AiOutlineArrowRight className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}