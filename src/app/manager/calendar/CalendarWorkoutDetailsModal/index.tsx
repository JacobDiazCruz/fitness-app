import { useEffect, useState } from "react";
import Modal, { ModalContent } from "@/components/global/Modal";
import { useQuery } from "react-query";
import { getWorkout } from "@/api/Workout";
import { getProgramWorkout } from "@/api/Program";
import EditMenu from "./EditMenu";
import EditWorkoutScheduleModal from "./EditWorkoutScheduleModal";
import DeleteCalendarSchedule from "./DeleteCalendarSchedule";
import SelectedExercisesList from "@/components/global/WorkoutDetailsModal/SelectedExercisesList";
import { secondaryTextColor } from "@/utils/themeColors";

interface Props {
  workoutId: string;
  setShowWorkoutDetailsModal: any;
  onClose: () => void;
  calendarSchedule: any;
};

export default function CalendarWorkoutDetailsModal({
  workoutId,
  setShowWorkoutDetailsModal,
  onClose,
  calendarSchedule
}: Props) {

  const [showEditScheduleModal, setShowEditScheduleModal] = useState<boolean>(false);

  // get exercise data
  const { 
    isLoading,
    data: workoutData,
    refetch
  } = useQuery('workout', () => {
    if (calendarSchedule.type === "Program") {
      return getProgramWorkout(workoutId);
    } else {
      return getWorkout(workoutId);
    }
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    refetch();
  }, []);

  const formatTaggedDate = (dateString: string) => {
    const options: object = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const calculateDay = (programDetails: any) => {
    return programDetails.dayIndex * parseInt(programDetails.weekId) + 1;
  }

  return (
    <Modal
      onClose={onClose}
      className="w-[600px] h-[90%]"
    >
      <div className="flex justify-between dark:bg-darkTheme-900 dark:border-b bg-[#10182a] min-h-[100px] p-7 dark:border-neutral-700">
        <div>
          <div className="flex justify-between">
            <div>
              {calendarSchedule.type === "Program" && (
                <div className={`text-neutral-200 text-[13px]`}>
                  Program Day {calculateDay(calendarSchedule?.workoutDetails?.programDetails)} - 
                  <span className="ml-2">
                    {formatTaggedDate(calendarSchedule?.taggedDate)}
                  </span>
                </div>
              )}
              <h2 className="font-semibold text-white mt-1">
                {workoutData?.name}
              </h2>
            </div>
          </div>
          <p className={`${secondaryTextColor} text-[13px] w-[60%] font-light mt-3 line-break-2`}>
            {workoutData?.description}
          </p>
        </div>
        <div className="flex">
          <EditMenu
            handleClick={() => setShowEditScheduleModal(true)}
            calendarSchedule={calendarSchedule}
          />
          {showEditScheduleModal && (
            <EditWorkoutScheduleModal
              calendarScheduleId={calendarSchedule._id}
              taggedDate={calendarSchedule.taggedDate}
              startTime={calendarSchedule.startTime}
              endTime={calendarSchedule.endTime}
              onClose={() => setShowEditScheduleModal(false)}
            />
          )}
          <DeleteCalendarSchedule 
            calendarScheduleId={calendarSchedule._id}
            onClose={() => setShowWorkoutDetailsModal?.(false)}
          />
        </div>
      </div>
      <ModalContent height="h-[80%]">
        {!isLoading && (
          <SelectedExercisesList
            currentWorkoutDetails={workoutData}
          />
        )}
      </ModalContent>
    </Modal>
  );
};