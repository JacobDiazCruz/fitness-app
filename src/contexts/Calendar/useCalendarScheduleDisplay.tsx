import useCalendar from "./useCalendar";

export default function useCalendarScheduleDisplay(calendarSchedule: any) {
  const {
    generateTimeList
  } = useCalendar();

  const startHour = parseInt(calendarSchedule.startTime.hour.split(":")[0], 10);
  const endHour = parseInt(calendarSchedule.endTime.hour.split(":")[0], 10);

  const initialStartTime = new Date().setHours(startHour, 0);
  const initialEndTime = new Date().setHours(endHour, 0);

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

  let height = 0;
  if (endTimeIndex > 0) {
    height =
      (endTimeIndex - startTimeIndex + 1) * 100 -
      (convertedStartTime === startTime ? 100 : 130);
    if (endTime !== convertedEndTime) {
      height += 50;
    }
  }

  let topOffset = startTimeIndex >= 0 ? startTimeIndex * 100 : 0;

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