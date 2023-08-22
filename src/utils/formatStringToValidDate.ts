export const formatStringToValidDate = (inputDate: any) => {
  const parts = inputDate.split('/'); // Split the input string by '/'
  const day = parseInt(parts[1], 10); // Parse the day part as an integer
  const month = parseInt(parts[0], 10) - 1; // Parse the month part as an integer (subtract 1 because months are 0-indexed)
  const year = parseInt(parts[2], 10); // Parse the year part as an integer

  const dateObject = new Date(year, month, day); // Create a new Date object

  return dateObject;
}