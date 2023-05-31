import { useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Image from "next/image";
import { Exercise } from "@/utils/types";

const addIcon: SVGAElement = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>;

export default function SelectedExercise({
  exercise
}: Exercise) {
  const [selectedSet, setSelectedSet] = useState("");
  const [reps, setReps] = useState("");
  const [checked, setChecked] = useState(false);

  const trashIcon: SVGAElement = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>;

  return (
    <div className="border border-solid border-gray-300 mt-5 rounded-lg overflow-hidden">
      <div className="py-2 px-4 bg-gray-100 h-[55px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center">
          <input
            checked
            id="checked-checkbox"
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          {checked}
          <div className="w-[42px] h-[33px] relative overflow-hidden rounded-md">
            <Image
              alt="Trainer Image"
              src={"/user.png"}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <p>{exercise.name}</p>
          </div>
          <div className="rounded-md text-center bg-[#DAF6E0] text-[#015212] px-2 text-[13px]">
            Core
          </div>
        </div>
        <button>
          {trashIcon}
        </button>
      </div>
      <div className="bg-white p-6">
        <div className="flex gap-[15px]">
          <div className="field">
            <p className="mb-2">Set</p>
            <AutoComplete
              items={[
                {
                  name: "Dropset"
                }
              ]}
              onChange={(val) => setSelectedSet(val)}
            />
          </div>
          <div className="field">
            <p className="mb-2">Reps</p>
            <TextField
              value={setReps}
              onChange={(val) => setSelectedSet(val)}
            />
          </div>
          <div className="field">
            <p className="mb-2">Rest</p>
            <TextField
              value={setReps}
              onChange={(val) => setSelectedSet(val)}
            />
          </div>
          <div>
            <p className="invisible mb-2">Actions</p>
            <Button
              startIcon={addIcon}
              className="border border-style border-[#EBEDFF] bg-[#EBEDFF] text-[#000E8D]"
            >
              Add a set
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}