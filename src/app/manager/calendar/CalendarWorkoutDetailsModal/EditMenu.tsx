import IconButton from "@/components/global/IconButton";
import Menu, { MenuItem, MenuItems } from "@/components/global/Menu";
import { useRouter } from "next/navigation";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";

interface Props {
  handleClick: () => Dispatch<SetStateAction<boolean>>;
  calendarSchedule: any;
};

export default function EditMenu({
  handleClick,
  calendarSchedule
}: Props) {
  const router = useRouter();

  const editButtonRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState<boolean>(false);  

  const toggleEditDropdown = () => {
    setIsEditDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <>
      <IconButton 
        className="mr-2"
        onClick={toggleEditDropdown}
        iconBtnRef={editButtonRef}
      >
        <BsPencil className="w-4 h-4 fill-neutral-600 dark:fill-white" />
      </IconButton>
      <Menu
        buttonRef={editButtonRef}
        open={isEditDropdownOpen}
        setIsDropdownOpen={setIsEditDropdownOpen}
      >
        <MenuItems>
          <MenuItem
            onClick={handleClick}
          >
            Edit schedule
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(`/manager/workouts/edit/${calendarSchedule.workoutDetails._id}?editProgram=true`)
            }}
          >
            Edit workout
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}