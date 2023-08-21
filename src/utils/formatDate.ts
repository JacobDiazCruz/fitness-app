export const formatDate = (inputDate: string) => {
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const parts = inputDate.split("/");
  const monthIndex = parseInt(parts[0]) - 1; // Months are zero-indexed in JavaScript
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  const dateObj = new Date(year, monthIndex, day);
  const dayIndex = dateObj.getDay();
  const formattedDate = `${daysOfWeek[dayIndex]}, ${months[monthIndex]} ${day}, ${year}`;
  return formattedDate;
};