// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { borderColor, fieldBgColor, primaryTextColor, secondaryTextColor } from '@/utils/themeColors';
import { CalendarIcon } from './Icons';
import { useEffect } from 'react';

export default function DatePickerField ({
  value,
  onChange,
  placeholder = "Select a date"
}) {

  useEffect(() => {
    const body = document.body;

    const handleRemoveScroll = () => {
      body.classList.remove("scroll-lock");
    };

    const handleAddScroll = () => {
      body.classList.add("scroll-lock");
    };

    // Function to check if .react-datepicker-popper class is available and trigger the scroll lock logic
    const checkAndHandleScrollLock = () => {
      const datepickerPopper = document.querySelector(".react-datepicker-popper");
      if (datepickerPopper) {
        handleAddScroll();
      } else {
        handleRemoveScroll();
      }
    };

    // Create a MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(checkAndHandleScrollLock);

    // Start observing changes in the body element
    observer.observe(document.body, { childList: true, subtree: true });

    // Stop observing and clean up when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center">
      {/* @ts-ignore */}
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="EEEE d, yyyy"
        className={`
          ${fieldBgColor}
          ${borderColor}
          ${primaryTextColor}
          appearance-none text-[14px] h-[45px] pl-9 border rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-blue-500
        `}
        placeholderText={placeholder}
      />
      <CalendarIcon className={`${secondaryTextColor} h-5 w-5 ml-2 absolute`} />
    </div>
  );
};