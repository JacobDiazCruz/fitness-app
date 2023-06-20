import Button from "@/components/global/Button";
import { useState } from "react";
import { AddIcon, ArrowRightIcon, ChevronRightIcon } from "@/components/global/Icons";
import AssignClientModal from "./AssignClientModal";
import { useParams, useRouter } from "next/navigation";

export default function HeaderActions({
  weeks
}: any) {
  const router = useRouter();
  const params = useParams();
  const [showAssignClientModal, setShowAssignClientModal] = useState<bolean>(false);

  return (
    <div class="flex justify-between mb-7">
      <div className="weeks-pagination flex items-center justify-between w-[230px]">
        <h5 className="dark:text-neutral-50 text-neutral-950 font-medium text-[14px]">
          Week
        </h5>
        <div className="flex items-center gap-[10px]">
          {weeks?.map((week, index) => (
            <div
              onClick={() => {
                router.push(`/manager/programs/edit/${params.id}?week=${index + 1}`)
              }}
              className="bg-white cursor-pointer shadow-md py-1 px-2 h-[29px] min-w-[22px] text-[14px] rounded-md"
            >
              {index + 1}
            </div>
          ))}
          <div className="bg-white cursor-pointer shadow-md flex items-center py-1 h-[29px] px-2 rounded-md">
            <ChevronRightIcon />
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