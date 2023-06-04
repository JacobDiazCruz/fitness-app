import Button from "@/components/global/Button";
import { useState } from "react";
import { AddIcon, ArrowRightIcon, ChevronRightIcon } from "@/components/global/Icons";

export default function HeaderActions() {
  const [weeks, setWeeks] = useState([1,2,3,4]);

  return (
    <div class="flex justify-between mb-7">
      <div className="weeks-pagination flex items-center justify-between w-[230px]">
        <h5 className="font-medium text-[14px]">Week</h5>
        <div className="flex items-center gap-[10px]">
          {weeks.map(week => (
            <div className="bg-white cursor-pointer shadow-md py-1 px-2 h-[29px] min-w-[22px] text-[14px] rounded-md">
              {week}
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
        <Button variant="contained" startIcon={<ArrowRightIcon />}>
          Assign to Client
        </Button>
      </div>
    </div>
  );
}