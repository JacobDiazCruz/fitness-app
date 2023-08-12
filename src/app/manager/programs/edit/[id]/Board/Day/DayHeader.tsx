import { AddIcon } from "@/components/global/Icons";
import Menu, { MenuItem, MenuItems } from "@/components/global/Menu";
import useProgramWorkouts from "@/store/Program/useProgramWorkouts";
import { UseProgramWorkoutsContext } from "@/utils/programTypes";
import { primaryTextColor } from "@/utils/themeColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";

interface Props {
  dayName: string;
  dayIndex: number;
  dayCount: number;
};

export default function DayHeader({
  dayName,
  dayIndex,
  dayCount
}: Props) {

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const weekId = searchParams.get("week");

  const {
    setShowAddWorkoutModal,
    setSelectedDayIndex,
    setSelectedDayCount
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const buttonRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);  

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center">
      <p className="uppercase text-[12px] text-gray-500 ml-1">
        {dayName}
      </p>
      <div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="group h-[32px] flex items-center dark:border-neutral-700 border-gray-200 border-solid border rounded-lg px-2"
          type="button"
          onClick={toggleDropdown}
          ref={buttonRef}
        >
          <AddIcon className={`${primaryTextColor} w-3 h-3`} />
        </button>
        <Menu
          buttonRef={buttonRef}
          open={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        >
          <MenuItems>
            <MenuItem onClick={() => {
              router.push(`/manager/workouts/add?programId=${params.id}&weekId=${weekId}&dayIndex=${dayIndex}&dayCount=${dayCount}&positionIndex=0`)
            }}>
              Add new workout
            </MenuItem>
            <MenuItem 
              onClick={() => {
                setShowAddWorkoutModal?.(true);
                setSelectedDayIndex?.(dayIndex);
                setSelectedDayCount?.(dayCount);
              }}
            >
              Select workouts
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};