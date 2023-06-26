'use client';

/** Component usage example: 
  <AutoComplete
    placeholder="Name"
    onChange={(val) => setState(val)}
    value={newValue}
    items={[{name: "John Doe"}]}
  />
**/

import { memo, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CloseIcon } from "./Icons";
import { fieldBgColor, primaryTextColor } from "@/utils/themeColors";

interface Props {
  value: Array<any>;
  addClass: string;
  type: string;
  startIcon: SVGAElement;
  items: Array<any>;
  chips: ReactNode;
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
  chips,
  removeSelectedItem,
  startIcon,
  placeholder = "",
  onChange,
  required = false
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Array>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [key, setKey] = useState<number>(0); // Add key state

  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  
  useEffect(() => {
    // filter dropdown items based on input value
    const newItems = items.filter((item) => {
      const itemName = item.name.toLowerCase();
      const input = inputValue.toLowerCase();
      return itemName.includes(input);
    });
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
    const handleSelectItem = (item) => {
      onChange(item);
    };

    return (
      <ul 
        ref={ref} 
        className="z-[100] dark:bg-neutral-950 bg-white dark:border-neutral-800 border border-solid absolute mt-1 max-h-[200px] w-[400px] overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
        aria-labelledby="headlessui-combobox-button-:R4q:" 
        role="listbox" 
        id="headlessui-combobox-options-:rl:" 
        data-headlessui-state="open"
      >
        {filteredItems.length ? (
          <>
            {filteredItems?.map((item: any) => (
              <li
                onClick={() => handleSelectItem(item.name)}
                className="relative dark:hover:bg-neutral-900 hover:bg-gray-100 cursor-pointer select-none py-2 px-4" id="headlessui-combobox-option-:rm:" role="option" tabIndex="-1" ariaSelected="false" data-headlessui-state=""
              >
                <span className="dark:text-neutral-50 text-neutral-900 block truncate font-normal">
                  {item.name}
                </span>
              </li>
            ))}
          </>
        ) : (
          <li className="py-3 pl-4">
            <span className={primaryTextColor}>No result.</span>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="autocomplete-container" key={key}>
      <div className={`${fieldBgColor} autocomplete-field relative w-full cursor-default overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
        <div className={`${fieldBgColor} w-full cursor-auto gap-[7px] border border-gray-200 text-sm leading-5 rounded-lg text-gray-900`}>
          <div className="flex flex-wrap w-half gap-[7px] py-1 px-2">
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
              onChange={(e: SyntheticEvent) => setInputValue(e.target.value)}
              type={type}
              required={required}
              className={`
                ${primaryTextColor}
                bg-transparent
                py-2 px-1 flex-1 min-w-0`
              }
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