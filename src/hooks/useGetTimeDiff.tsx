export default function useGetTimeDiff (updatedAt: string) {
  const currentTime: Date = new Date();
  const updatedTime: Date = new Date(updatedAt);

  const timeDiff: number = Math.abs(currentTime.getTime() - updatedTime.getTime());
  
  // calculate & construct minutes display
  const minutes = Math.floor(timeDiff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  
  // calculate & construct hours display
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  
  // calculate & construct days and months
  const options: Intl.DateTimeFormatOptions = {
    month: "long", 
    day: "numeric" 
  };
  return updatedTime.toLocaleDateString(undefined, options);
};