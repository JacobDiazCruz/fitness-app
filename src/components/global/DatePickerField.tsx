// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { borderColor, fieldBgColor, primaryTextColor, secondaryTextColor } from '@/utils/themeColors';
import { CalendarIcon } from './Icons';

const DatePickerField = ({
  value,
  onChange
}) => {
  return (
    <div className="flex items-center">
      {/* @ts-ignore */}
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className={`
          ${fieldBgColor}
          ${borderColor}
          ${primaryTextColor}
          appearance-none text-[14px] h-[45px] pl-9 border rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-blue-500
        `}
        placeholderText="Select a date"
      />
      <CalendarIcon className={`${secondaryTextColor} h-5 w-5 ml-2 absolute`} />
    </div>
  );
};

export default DatePickerField;
