import { useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Image from "next/image";

export default function EditExercises() {
  const [selectedSet, setSelectedSet] = useState("");
  const [reps, setReps] = useState("");

  const addIcon: SVGAElement = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>;

  const trashIcon: SVGAElement = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>;

  return (
    <div className="exercises-section mt-5">
      <p className="mb-3 text-[14px]">Exercises</p>
      <div className="btn-actions flex items-center">
        <Button 
          startIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
          }
          variant="outlined mr-2"
        >
          Superset
        </Button>
        <Button 
          startIcon={<svg width="24" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0388 8.32591H8.76562C6.77222 8.32591 5.15625 9.94188 5.15625 11.9353C5.15625 13.929 6.77222 15.5447 8.76562 15.5447H13.5781C15.4516 15.5447 16.9916 14.1178 17.1703 12.2914L17.1737 12.2526C17.1804 12.1663 17.2194 12.0857 17.2828 12.0269C17.3463 11.9681 17.4296 11.9354 17.5161 11.9353H17.8888C17.9325 11.9353 17.9758 11.9444 18.0159 11.9619C18.0561 11.9794 18.0921 12.0049 18.1219 12.037C18.1517 12.069 18.1746 12.1069 18.1891 12.1482C18.2037 12.1895 18.2095 12.2333 18.2064 12.277C18.0314 14.6805 16.0263 16.5759 13.5781 16.5759H8.76562C6.20263 16.5759 4.125 14.4983 4.125 11.9353C4.125 9.37229 6.20263 7.29466 8.76562 7.29466H12.9367L12.3038 6.66182C12.2394 6.59737 12.2031 6.50995 12.2031 6.41879V5.8107C12.2031 5.74923 12.2213 5.68913 12.2554 5.638C12.2895 5.58688 12.338 5.54702 12.3948 5.52347C12.4516 5.49992 12.5141 5.49374 12.5744 5.5057C12.6347 5.51767 12.6901 5.54725 12.7335 5.5907L14.8352 7.69238C14.8801 7.73725 14.9052 7.79808 14.9052 7.86151C14.9052 7.92494 14.8801 7.98577 14.8352 8.03063L12.7335 10.132C12.6901 10.1754 12.6347 10.205 12.5744 10.217C12.5141 10.2289 12.4516 10.2228 12.3948 10.1992C12.338 10.1757 12.2895 10.1358 12.2554 10.0847C12.2213 10.0335 12.2031 9.97344 12.2031 9.91198V9.30423C12.2031 9.21307 12.2394 9.12565 12.3038 9.0612L13.0388 8.32591ZM9.38713 11.6589V10.8865C9.93094 10.8143 10.3207 10.5833 10.5566 10.1935H11.264V13.9978H10.3111V11.3052C10.1186 11.4544 9.81063 11.5723 9.38713 11.6593V11.6589Z" fill="black"/>
          </svg>
          }
          variant="outlined"
        >
          Circuit
        </Button>
      </div>
      <div className="border border-solid border-gray-300 mt-5 rounded-lg overflow-hidden">
        <div className="py-2 px-4 bg-gray-100 h-[55px] flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <input 
              checked 
              id="checked-checkbox" 
              type="checkbox" 
              value="" 
              className="w-4 h-4 rounded-lg text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="w-[42px] h-[33px] relative overflow-hidden rounded-md">
              <Image
                alt="Trainer Image"
                src={"/user.png"}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div>
              <p>Incline Push-up</p>
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
      <div className="border-[2px] rounded-lg border-dashed border-gray-300 mt-5 h-[196px] flex items-center">
        <div className="m-auto">
          <div className="rounded-full w-[52px] h-[52px] bg-gray-100 flex m-auto items-center">
            <svg t="1685421363075" className="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5058" width="25" height="25"><path d="M745.813333 279.466667l-121.173333-121.173334a42.666667 42.666667 0 0 0-60.586667 0 42.666667 42.666667 0 0 0 0 60.16l90.453334 90.453334-345.6 345.6-90.453334-90.453334a42.666667 42.666667 0 0 0-60.16 0 42.666667 42.666667 0 0 0 0 60.586667l119.893334 119.893333 119.893333 119.893334a42.666667 42.666667 0 0 0 30.293333 12.8 42.666667 42.666667 0 0 0 30.293334-72.96l-89.173334-89.173334 345.6-345.6 90.453334 90.453334a42.666667 42.666667 0 1 0 60.16-60.586667zM158.293333 744.96a42.666667 42.666667 0 0 0-60.586666 60.586667l120.746666 120.746666a42.666667 42.666667 0 0 0 30.293334 12.373334 42.666667 42.666667 0 0 0 30.293333-12.373334 42.666667 42.666667 0 0 0 0-60.586666z m768-526.506667l-120.746666-120.746666a42.666667 42.666667 0 0 0-60.586667 60.586666l120.746667 120.746667a42.666667 42.666667 0 0 0 60.586666 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="5059" fill="#90959A"></path></svg>
          </div>
          <p className="mt-3 text-[16px] text-gray-500">
            Drag &amp; Drop your exercise
          </p>
        </div>
      </div>
    </div>
  );
}