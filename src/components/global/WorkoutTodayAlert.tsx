import { listClients } from "@/api/Client";
import Button from "@/components/global/Button";
import { borderColor, primaryBgColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import useLocalStorage from "@/hooks/useLocalStorage";
import { BiSolidBell } from "react-icons/bi";

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
    <div className={`z-[900] fixed bottom-10 right-10 px-5 w-fit ${borderColor} bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-800 text-white border p-3 rounded-lg w-[90%] m-auto`}>
      <div
        className="dark:bg-white flex items-center bg-neutral-700 cursor-pointer shadow-xl dark:border border-solid fixed items-center rounded-full w-[23px] h-[23px] absolute right-[-10px] top-[-10px] z-[999]"
      >
        <MdClose className={`dark:fill-neutral-800 fill-white w-4 h-4 m-auto`}/>
      </div>
      <div
        className="flex gap-[15px] cursor-pointer"
        onClick={() => {
          router.push('/workout/232421');
        }}
      >
        <BiSolidBell className="w-5 h-5 text-blue-50 mt-[2px]" />
        <div>
          <h4 className={`text-blue-50 text-[16px]`}><b>{firstName}</b>, you have a workout today!</h4>
        </div>
      </div>
    </div>
  );
}