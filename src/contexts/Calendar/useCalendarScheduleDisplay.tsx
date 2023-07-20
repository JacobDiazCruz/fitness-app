import { tertiaryTextColor } from "@/utils/themeColors";

export default function useCalendarScheduleDisplay(calendarSchedule: any) {
  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(0);
      times.push(time);
    }
    const options: object = { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };

    return times.map((time, index) => (
      <li key={index} className={`${tertiaryTextColor} h-[100px] relative text-[14px] border-b w-full`}>
        {time.toLocaleTimeString('en-US', options)}
      </li>
    ));
  };

  const startTimeParts = calendarSchedule.startTime.hour.split(":");
  const startHour = parseInt(startTimeParts[0], 10);
  const startMinute = parseInt(startTimeParts[1], 10);

  const endTimeParts = calendarSchedule.endTime.hour.split(":");
  const endHour = parseInt(endTimeParts[0], 10);
  const endMinute = parseInt(endTimeParts[1], 10);

  const initialStartTime = new Date().setHours(startHour, startMinute, 0, 0);

  const initialEndTime = new Date().setHours(endHour, endMinute, 0, 0);

  const startTime = new Date(initialStartTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
  const endTime = new Date(initialEndTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  const timeList = generateTimeList();

  // Check if the minutes of startTime is not equal to "00"
  let convertedStartTime = startTime;
  if (startTime.slice(-5, -3) !== "00") {
    convertedStartTime =
      startTime.slice(0, startTime.lastIndexOf(":") + 1) +
      "00" +
      startTime.slice(-3);
  }

  const startTimeIndex = timeList.findIndex((timeElement) => {
    const timeText = timeElement.props.children;
    return timeText === convertedStartTime;
  });

  let convertedEndTime = endTime;
  if (startTime.slice(-5, -3) !== "00") {
    convertedEndTime =
      endTime.slice(0, endTime.lastIndexOf(":") + 1) +
      "00" +
      endTime.slice(-3);
  }

  const endTimeIndex = timeList.findIndex((timeElement) => {
    const timeText = timeElement.props.children;
    return timeText === convertedEndTime;
  });

  let height = 50; // default height value for times like 12:30 or 12:15
  if (endTimeIndex > 0) {
    height =
      (endTimeIndex - startTimeIndex + 1) * 100 -
      (convertedStartTime === startTime ? 100 : 130);
    if (endTime !== convertedEndTime) {
      height += 30;
    }
  }

  let topOffset = startTimeIndex >= 0 ? (startTimeIndex + 0.75) * 100 : 0;

  // if clock's last 2 digits are not equal to 00
  if (
    startTime.slice(startTime.indexOf(":") + 1, startTime.indexOf(":") + 3) !==
    "00"
  ) {
    topOffset += 50; // Add an additional 50px to the topOffset
  }

  return {
    topOffset,
    height,
    startTime,
    endTime,
  };
};