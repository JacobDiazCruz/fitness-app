import { borderColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { MdClose } from "react-icons/md";
import useLocalStorage from "@/hooks/useLocalStorage";
import { BiSolidBell } from "react-icons/bi";
import SelectedExercisesList from "./WorkoutDetailsModal/SelectedExercisesList";
import { getProgramWorkout } from "@/api/Program";
import { getWorkout } from "@/api/Workout";
import { listWeeklyCalendarSchedules } from "@/api/Calendar";
import { useEffect, useState } from "react";
import Modal, { ModalContent } from "./Modal";

export default function SidebarWorkoutToday() {
  const firstName = useLocalStorage("firstName");

  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [isFetchCalendarScheduleDone, setIsFetchCalendarScheduleDone] = useState<boolean>(false);

  // fetch calendar schedule for today
  const { 
    data: calendarSchedules,
    refetch: refetchCalendarSchedules
  } = useQuery(
    'calendarSchedules',
    () => {
      return listWeeklyCalendarSchedules(JSON.stringify([new Date().toLocaleDateString()]));
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true
    }
  );

  useEffect(() => {
    if(calendarSchedules) {
      setIsFetchCalendarScheduleDone(true);
    }
  }, [calendarSchedules]);

  // fetch workouts based on the calendar
  const {
    isLoading: isLoadingFetchWorkoutData,
    data: workoutData
  } = useQuery('workout', () => {
    if (calendarSchedules[0].type === "Program") {
      return getProgramWorkout(calendarSchedules[0].workoutDetails._id);
    } else {
      return getWorkout(calendarSchedules[0].workoutDetails._id);
    }
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isFetchCalendarScheduleDone
  });

  return (
    <>
      {(calendarSchedules && calendarSchedules.length) && (
        <div className={`z-[900] fixed bottom-10 right-10 px-5 w-fit ${borderColor} bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-800 text-white border p-3 rounded-lg w-[90%] m-auto`}>
          <div
            className="dark:bg-white flex items-center bg-neutral-700 cursor-pointer shadow-xl dark:border border-solid fixed items-center rounded-full w-[23px] h-[23px] absolute right-[-10px] top-[-10px] z-[999]"
          >
            <MdClose className={`dark:fill-neutral-800 fill-white w-4 h-4 m-auto`}/>
          </div>
          <div
            className="flex gap-[15px] cursor-pointer"
            onClick={() => {
              setShowWorkoutDetailsModal(true);
            }}
          >
            <BiSolidBell className="w-5 h-5 text-blue-50 mt-[2px]" />
            <div>
              <h4 className={`text-blue-50 text-[16px]`}><b>{firstName}</b>, you have a workout today!</h4>
            </div>
          </div>
        </div>
      )}

      {(showWorkoutDetailsModal && !isLoadingFetchWorkoutData) && (
        <Modal
          onClose={() => setShowWorkoutDetailsModal(false)} 
          className="w-[600px] h-[90%]"
        >
          <ModalContent>
            <div className="mb-5">
              <div className={`${primaryTextColor} font-semibold`}>
                {workoutData?.name}
              </div>
              <div className={`${secondaryTextColor} text-[14px] mt-1`}>
                {workoutData?.description}
              </div>
            </div>
            <SelectedExercisesList
              currentWorkoutDetails={workoutData}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};