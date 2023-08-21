export const formatTime = (hour: string) => {
  const startTimeParts = hour.split(":");
  const startHour = parseInt(startTimeParts[0], 10);
  const startMinute = parseInt(startTimeParts[1], 10);
  
  const time = new Date().setHours(startHour, startMinute, 0, 0);

  return new Date(time).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}