import { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { primaryTextColor } from "@/utils/themeColors";

export default function AssignClientModal({ onClose }: any) {
  return (
    <Modal onClose={onClose} className="w-[500px] h-[500px] p-7">
      <div className="flex justify-between">
        <h2 className={`${primaryTextColor} font-semibold`}>Assign to Client</h2>
        <button onClick={onClose}>
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="field mt-7">
        <p className={`${primaryTextColor} font-normal mb-3`}>
          Assign to
        </p>
        <TextField />
      </div>
      <div className="field mt-7">
        <p className={`${primaryTextColor} font-normal mb-3`}>
          Starting day
        </p>
        <TextField />
      </div>
      <div className="modal-footer absolute left-0 bottom-0 w-full p-4 dark:bg-neutral-950 bg-gray-100">
        <Button className="w-full text-center" variant="contained">
          Assign
        </Button>
      </div>
    </Modal>
  );
}