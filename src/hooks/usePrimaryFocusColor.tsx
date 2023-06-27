export default function usePrimaryFocusColor() {
  const handlePrimaryFocusColor = (primaryFocus) => {
    const collection = {
      "Abs": "dark:bg-green-50 dark:border dark:border-style dark:border-green-300 dark:text-green-300 bg-green-100 text-green-900",
      "Biceps": "dark:bg-green-950 dark:border dark:border-style dark:border-green-300 dark:text-green-300 bg-green-100 text-green-900",
      "Core": "dark:bg-transparent dark:border dark:border-style dark:border-green-300 dark:text-green-300 bg-green-100 text-green-900",
      "Upper Chest": "dark:bg-indigo-950 dark:border dark:border-indigo-400 dark:text-indigo-200 bg-indigo-100 text-indigo-900",
      "Middle Chest": "dark:bg-transparent dark:border dark:border-style dark:border-indigo-300 dark:text-indigo-300 bg-indigo-100 text-cyan-900",
      "Lower Chest": "dark:bg-transparent dark:border dark:border-style dark:border-indigo-300 dark:text-indigo-300 bg-indigo-100 text-sky-900",
      "Triceps": "dark:bg-transparent dark:border dark:border-style dark:border-blue-300 dark:text-blue-300 bg-blue-100 text-blue-900",
      "Upper Back": "dark:bg-transparent dark:border dark:border-style dark:border-violet-300 dark:text-violet-300 bg-violet-100 text-violet-900",
      "Back Lats": "dark:bg-transparent dark:border dark:border-style dark:border-purple-300 dark:text-purple-300 bg-purple-100 text-purple-900",
      "Lower Back": "dark:bg-fuchsia-300 bg-fuchsia-100 text-fuchsia-900",
      "Traps": "dark:bg-pink-300 bg-pink-100 text-pink-900",
      "Hamstrings (Legs)": "dark:bg-red-300 bg-red-100 text-red-900",
      "Quadraceps (Legs)": "dark:bg-rose-300 bg-rose-100 text-rose-900",
      "Calves (Legs)": "dark:bg-rose-300 bg-rose-100 text-rose-900",
      "Forearms": "dark:bg-amber-300 bg-amber-100 text-amber-900",
      "Front Delts": "dark:bg-orange-300 bg-orange-100 text-orange-900",
      "Side Delts": "dark:bg-yellow-300 bg-yellow-100 text-yellow-900",
      "Rear Delts": "dark:bg-amber-300 bg-amber-100 text-amber-900"
    }
    return collection[primaryFocus];
  }

  return {
    handlePrimaryFocusColor
  }
};