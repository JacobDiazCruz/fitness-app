export const convertTimerToSeconds = (timer: string) => {
  const [minutes, seconds] = timer.split(':').map(Number);
  return minutes * 60 + seconds;
};