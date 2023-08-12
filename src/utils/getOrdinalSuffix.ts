export const getOrdinalSuffix = (number: number) => {
  const suffixes = ["st", "nd", "rd", "th"];
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return number + "st";
  } else if (remainder10 === 2 && remainder100 !== 12) {
    return number + "nd";
  } else if (remainder10 === 3 && remainder100 !== 13) {
    return number + "rd";
  } else {
    return number + "th";
  }
};