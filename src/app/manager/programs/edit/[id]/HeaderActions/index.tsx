import Button from "@/components/global/Button";
import { useState } from "react";
import { AddIcon, ArrowRightIcon } from "@/components/global/Icons";
import AssignClientModal from "./AssignClientModal";
import WeeksPagination from "./WeeksPagination";
import PermissionAccess from "@/components/global/PermissionAccess";
import { LiaSyncAltSolid } from "react-icons/lia";
import SyncToCalendarModal from "./SyncToCalendarModal";
import { CalendarScheduleBuilderProvider } from "@/store/Calendar/useCalendarScheduleForm";
interface Props {
  weeks: Array<any>;
};

export default function HeaderActions({
  weeks
}: Props) {

  const [showAssignClientModal, setShowAssignClientModal] = useState<boolean>(false);
  const [showSyncToClientModal, setShowSyncToClientModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row justify-between mb-7">
      <WeeksPagination weeks={weeks} />

      <div className="flex gap-[15px] mt-7 md:mt-0">
        <Button 
          variant="outlined" 
          className="w-full md:w-auto" 
          startIcon={<AddIcon />}
        >
          Add Week
        </Button>
        <Button 
          variant="outlined" 
          className="w-full md:w-auto" 
          startIcon={<LiaSyncAltSolid />}
          onClick={() => setShowSyncToClientModal(true)}
        >
          Sync to Calendar
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

      {showSyncToClientModal && (
        <SyncToCalendarModal
          onClose={() => setShowSyncToClientModal(false)}
        />
      )}
    </div>
  );
};