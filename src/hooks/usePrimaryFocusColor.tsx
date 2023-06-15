export default function usePrimaryFocusColor() {
  const handlePrimaryFocusColor = (primaryFocus) => {
    const collection = {
      "Abs": "bg-green-100 text-green-900",
      "Biceps": "bg-green-100 text-green-900",
      "Core": "bg-green-100 text-green-900",
      "Upper Chest": "bg-indigo-100 text-indigo-900",
      "Middle Chest": "bg-cyan-100 text-cyan-900",
      "Lower Chest": "bg-sky-100 text-sky-900",
      "Triceps": "bg-blue-100 text-blue-900",
      "Upper Back": "bg-violet-100 text-violet-900",
      "Back Lats": "bg-purple-100 text-purple-900",
      "Lower Back": "bg-fuchsia-100 text-fuchsia-900",
      "Traps": "bg-pink-100 text-pink-900",
      "Hamstrings (Legs)": "bg-red-100 text-red-900",
      "Quadraceps (Legs)": "bg-rose-100 text-rose-900",
      "Calves (Legs)": "bg-rose-100 text-rose-900",
      "Forearms": "bg-amber-100 text-amber-900",
      "Front Delts": "bg-orange-100 text-orange-900",
      "Side Delts": "bg-yellow-100 text-yellow-900",
      "Rear Delts": "bg-amber-100 text-amber-900"
    }
    return collection[primaryFocus];
  }

  return {
    handlePrimaryFocusColor
  }
};