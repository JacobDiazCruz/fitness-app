import Button from "@/components/global/Button";
import { useState } from "react";
import { AddIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/global/Icons";
import AssignClientModal from "../AssignClientModal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import WeeksPagination from "./WeeksPagination";
import PermissionAccess from "@/components/global/PermissionAccess";

interface Props {
  weeks: Array<any>;
};

export default function HeaderActions({
  weeks
}: Props) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentWeek = searchParams?.get('week');
  const [showAssignClientModal, setShowAssignClientModal] = useState<bolean>(false);

  return (
    <div class="flex flex-col md:flex-row justify-between mb-7">
      <WeeksPagination weeks={weeks} />

      <div className="flex gap-[15px] mt-7 md:mt-0">
        <Button variant="outlined" className="w-full md:w-auto" startIcon={<AddIcon />}>
          Add Week
        </Button>
        <PermissionAccess roleAccess="Coach">
          <Button
            variant="contained"
            className="w-full md:w-auto"
            startIcon={<ArrowRightIcon />}
            onClick={() => setShowAssignClientModal(true)}
          >
            Assign to Client
          </Button>
        </PermissionAccess>
      </div>

      {showAssignClientModal && (
        <AssignClientModal
          onClose={() => setShowAssignClientModal(false)}
        />
      )}
    </div>
  );
}