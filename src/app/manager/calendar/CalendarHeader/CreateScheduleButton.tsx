import useCalendarScheduleBuilder from "@/contexts/Calendar/useCalendarScheduleBuilder";
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { MdAdd, MdArrowDropDown } from "react-icons/md";

interface Props {
  handleShowScheduleModal: () => Dispatch<SetStateAction<boolean>>;
};

export default function CreateScheduleButton ({
  handleShowScheduleModal
}: Props) {
  const {
    setShowCreateScheduleModal, 
    setActiveTab 
  } = useCalendarScheduleBuilder();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [createScheduleList] = useState([
    {
      type: "CREATE_EVENT",
      title: "Event"
    },
    {
      type: "CREATE_TASK",
      title: "Task"
    },
    {
      type: "CREATE_WORKOUT",
      title: "Workout"
    },
    {
      type: "CREATE_PROGRAM",
      title: "Program"
    }
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleClickItem = (title: string) => {
    setIsDropdownOpen(false);
    setShowCreateScheduleModal(true);
    setActiveTab(title);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        <MdAdd />
        <span className="mx-2">Create</span>
        <MdArrowDropDown />
      </button>
      {isDropdownOpen && (
        <div
          id="dropdown"
          ref={dropdownRef}
          className="z-[100] bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {createScheduleList.map((item: any) => (
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={() => handleClickItem(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};