import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import TableItemActions from "@/components/global/TableItemActions";

const handlePrimaryFocusColor = (primaryFocus) => {
  console.log("primaryFocus", primaryFocus)
  const collection = {
    "Abs": "bg-green-200 text-green-900",
    "Biceps": "bg-green-200 text-green-900",
    "Core": "bg-green-200 text-green-900",
    "Upper Chest": "bg-indigo-200 text-indigo-900",
    "Middle Chest": "bg-cyan-200 text-cyan-900",
    "Lower Chest": "bg-sky-200 text-sky-900",
    "Triceps": "bg-blue-200 text-blue-900",
    "Upper Back": "bg-violet-200 text-violet-900",
    "Back Lats": "bg-purple-200 text-purple-900",
    "Lower Back": "bg-fuchsia-200 text-fuchsia-900",
    "Traps": "bg-pink-200 text-pink-900",
    "Hamstrings (Legs)": "bg-red-200 text-red-900",
    "Quadraceps (Legs)": "bg-rose-200 text-rose-900",
    "Calves (Legs)": "bg-rose-200 text-rose-900",
    "Forearms": "bg-amber-200 text-amber-900",
    "Front Delts": "bg-orange-200 text-orange-900",
    "Side Delts": "bg-yellow-200 text-yellow-900",
    "Rear Delts": "bg-amber-200 text-amber-900"
  }
  return collection[primaryFocus];
}

export default function TableItem({
  itemId,
  name,
  primaryFocus,
  category,
  coverImage
}) {
  
  return (
    <div className="bg-white cursor-pointer w-full border-t border-gray-100 border-t-solid rounded-lg py-4 px-5">
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] flex-1">
          <div className="rounded-md bg-gray-300 w-[50px] h-[50px] overflow-hidden relative">
            <Image
              alt="Trainer Image"
              src={coverImage}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <h5 className="font-medium text-[14px]">
              {name || '--'}
            </h5>
          </div>
        </div>
        <div className="col-3 flex-1">
          <div className={`${handlePrimaryFocusColor(primaryFocus)} w-[fit-content] py-2 px-3 rounded-lg font-medium text-[14px]`}>
            {primaryFocus || '--'}
          </div>
        </div>
        <div className="col-4 flex-1">
          <p className="text-[14px] text-gray-500">
            {category || '--'}
          </p>
        </div>
        <div className="col-5 flex-1">
          <p className="text-[14px] text-gray-500">July 12, 2023</p>
        </div>
        <div className="col-5">
          <TableItemActions itemId={itemId} />
        </div>
      </div>
    </div>
  );
}