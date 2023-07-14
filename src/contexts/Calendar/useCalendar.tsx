import { primaryTextColor } from "@/utils/themeColors";

export default function useCalendar() {
  
  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(0);
      times.push(time);
    }
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return times.map((time) => (
      <li key={time} className={`${primaryTextColor} h-[100px] relative text-[14px]`}>
        {time.toLocaleTimeString('en-US', options)}
      </li>
    ));
  };

  return {
    generateTimeList
  };
};