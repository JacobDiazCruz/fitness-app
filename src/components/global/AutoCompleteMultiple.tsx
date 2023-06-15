'use client';

/** Component usage example: 
  <AutoComplete
    placeholder="Name"
    onChange={(val) => setState(val)}
    value={newValue}
    items={[{name: "John Doe"}]}
  />
**/

import { memo, useEffect, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CloseIcon } from "./Icons";

interface Props {
  value: Array<any>;
  addClass: string;
  type: string;
  startIcon: SVGAElement;
  items: Array<any>;
  placeholder: string;
  removeSelectedItem: any;
  onChange: () => void;
  required: boolean;
};

function AutoComplete({
  value = [],
  addClass = "",
  type = "text",
  items,
  removeSelectedItem,
  startIcon,
  placeholder = "",
  onChange,
  required = false
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Array>(items);
  const [inputValue, setInputValue] = useState<string>("");
  const [key, setKey] = useState<number>(0); // Add key state

  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });

  useEffect(() => {
    // filter dropdown items based on input value
    const newItems = items.filter((item) => {
      console.log("inputValue", inputValue)
      const itemName = item.name.toLowerCase();
      const input = inputValue.toLowerCase();
      return itemName.includes(input);
    });
    console.log("newItems", newItems)
    setFilteredItems(newItems);
  }, [inputValue]);

  useEffect(() => {
    setKey(prevKey => prevKey + 1); // Update key whenever value changes
  }, [value]);

  const handleOpenDropdown = () => {
    if(!openDropdown) {
      setOpenDropdown(true)
    }
  };

  const DropdownList = () => {
    const handleClickDropdownItem = (name) => {
      onChange(name);
    };

    return (
      <ul ref={ref} className="z-[100] absolute mt-1 max-h-[200px] w-[400px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" aria-labelledby="headlessui-combobox-button-:R4q:" role="listbox" id="headlessui-combobox-options-:rl:" data-headlessui-state="open">
        {filteredItems.length ? (
          <>
            {filteredItems?.map((item: any) => (
              <li
                onClick={() => handleClickDropdownItem(item.name)}
                className="relative hover:bg-gray-100 cursor-pointer select-none py-2 px-4 text-gray-900" id="headlessui-combobox-option-:rm:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state=""
              >
                <span className="block truncate font-normal">{item.name}</span>
              </li>
            ))}
          </>
        ) : (
          <li className="py-3 pl-4">
            <span>No result.</span>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="autocomplete-container" key={key}>
      <div className="autocomplete-field relative w-full cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <div className="w-full cursor-auto gap-[7px] bg-[#f6f6f6] border border-gray-200 text-sm leading-5 rounded-lg text-gray-900" >
          <div className="flex flex-wrap w-half gap-[7px] p-2">
            {value?.map((val, index) => (
              <div 
                key={index} 
                className="bg-white flex gap-[5px] shadow-sm py-2 px-3 rounded-full"
              >
                <p>{val}</p>
                <button onClick={() => removeSelectedItem(val)}>
                  <CloseIcon className="text-gray-400 w-4 h-4" />
                </button>
              </div>
            ))}
            <input
              onClick={() => handleOpenDropdown()}
              onChange={(e: any) => setInputValue(e.target.value)}
              type={type}
              required={required}
              className="bg-transparent py-2 px-1 flex-1 min-w-0"
              value={inputValue}
              role="combobox"
              type="text"
              aria-expanded="false"
            />
          </div>
        </div>
        <button
          onClick={() => handleOpenDropdown()}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <svg t="1685348688578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6196" width="17" height="17"><path d="M192.161209 399.798489c1.289673 9.027708 5.15869 16.765743 11.607053 23.214105l282.438287 282.438288c16.765743 16.765743 42.559194 16.765743 59.324937 0l282.438287-282.438288c6.448363-6.448363 10.31738-14.186398 11.607053-23.214105H192.161209z" fill="#B0B9BE" p-id="6197"></path></svg>
        </button>
      </div>
      {openDropdown && <DropdownList />}
    </div>
  );
}

export default memo(AutoComplete);