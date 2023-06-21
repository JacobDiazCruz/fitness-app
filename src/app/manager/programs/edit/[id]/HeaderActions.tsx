import Button from "@/components/global/Button";
import { useState } from "react";
import { AddIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/global/Icons";
import AssignClientModal from "./AssignClientModal";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function HeaderActions({
  weeks
}: any) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentWeek = searchParams?.get('week');
  const [showAssignClientModal, setShowAssignClientModal] = useState<bolean>(false);

  return (
    <div class="flex justify-between mb-7">
      <div className="weeks-pagination flex items-center justify-between w-[320px]">
        <h5 className="dark:text-neutral-50 text-neutral-950 font-medium text-[14px]">
          Week {currentWeek}
        </h5>
        <div className="flex items-center gap-[10px]">
          <div className="dark:bg-black dark:border dark:border-solid dark:border-neutral-700 dark:text-neutral-50 bg-white cursor-pointer shadow-md flex items-center py-1 h-[29px] w-[28px] rounded-md">
            <ChevronLeftIcon className="w-4 h-4 m-auto" />
          </div>
          {weeks?.map((week, index) => (
            <div
              onClick={() => {
                router.push(`/manager/programs/edit/${params.id}?week=${index + 1}`)
              }}
              className={`
                ${currentWeek == index + 1 ? 'dark:border-green-500 dark:text-green-500 text-green-500' : 'dark:border-neutral-700 dark:text-neutral-400'}
                dark:bg-black dark:border dark:border-solid
                bg-white cursor-pointer shadow-md py-1 px-2 h-[29px] min-w-[28px] text-[14px] text-center rounded-md`}
            >
              {index + 1}
            </div>
          ))}
          <div className="dark:bg-black dark:border dark:border-solid dark:border-neutral-700 dark:text-neutral-50 bg-white cursor-pointer shadow-md flex items-center py-1 h-[29px] w-[28px] rounded-md">
            <ChevronRightIcon className="w-4 h-4 m-auto" />
          </div>
        </div>
      </div>

      <div className="flex gap-[15px]">
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add Week
        </Button>
        <Button 
          variant="contained" 
          startIcon={<ArrowRightIcon />}
          onClick={() => setShowAssignClientModal(true)}
        >
          Assign to Client
        </Button>
      </div>

      {showAssignClientModal && (
        <AssignClientModal
          onClose={() => setShowAssignClientModal(false)}
        />
      )}
    </div>
  );
}