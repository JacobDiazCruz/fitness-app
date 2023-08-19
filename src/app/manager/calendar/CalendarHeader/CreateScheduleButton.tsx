import useCalendarScheduleForm from "@/store/Calendar/useCalendarScheduleForm";
import useCalendarScheduleBuilder from "@/store/Calendar/useCalendarScheduleBuilder";
import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { MdAdd, MdArrowDropDown } from "react-icons/md";

export default function CreateScheduleButton () {
  const {
    setShowCreateScheduleModal,
    setActiveTab
  }: any = useCalendarScheduleBuilder();

  const {
    createScheduleList
  }: any = useCalendarScheduleForm();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const buttonRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleOutsideClick = (event: React.MouseEvent<Document>) => {
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