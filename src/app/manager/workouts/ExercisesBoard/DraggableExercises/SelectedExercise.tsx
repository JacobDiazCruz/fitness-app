import { memo, useEffect, useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Image from "next/image";
import { Exercise } from "@/utils/types";
import { AddIcon, TrashIcon } from "@/components/global/Icons";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import IconButton from "@/components/global/IconButton";

const SelectedExercise = ({
  name,
  imageSrc,
  onCheck,
  primaryFocus,
  checked,
  showCheckInput = true
}) => {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
  const [selectedSet, setSelectedSet] = useState("");
  const [reps, setReps] = useState("");

  return (
    <div className="dark:border-neutral-700 border-gray-200 border border-solid overflow-hidden">
      <div className="py-2 px-4 dark:bg-neutral-900 bg-gray-100 h-[55px] flex justify-between items-center">
        <div className="flex gap-[10px] items-center">
          {showCheckInput && (
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              checked={checked}
              onChange={onCheck}
            />
          )}
          <div className="w-[42px] h-[33px] relative overflow-hidden rounded-md">
            <Image
              alt="Trainer Image"
              src={imageSrc}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <p className="dark:text-neutral-50 text-neutral-950">
              {name}
            </p>
          </div>
          <div className={`${handlePrimaryFocusColor(primaryFocus)} rounded-md text-center px-2 text-[13px]`}>
            {primaryFocus}
          </div>
        </div>
        <IconButton>
          <TrashIcon className="w-5 h-5 dark:text-white text-neutral-700" />
        </IconButton>
      </div>
      <div className="dark:bg-neutral-950 bg-white p-6">
        <div className="flex gap-[15px]">
          <div className="field">
            <p className="dark:text-neutral-50 text-neutral-950 mb-2">Set</p>
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
            <p className="dark:text-neutral-50 text-neutral-950 mb-2">Reps</p>
            <TextField
              value={setReps}
              onChange={(val) => setSelectedSet(val)}
            />
          </div>
          <div className="field">
            <p className="dark:text-neutral-50 text-neutral-950 mb-2">Rest</p>
            <TextField
              value={setReps}
              onChange={(val) => setSelectedSet(val)}
            />
          </div>
          <div>
            <p className="invisible mb-2">Actions</p>
            <Button
              startIcon={<AddIcon />}
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

export default memo(SelectedExercise);