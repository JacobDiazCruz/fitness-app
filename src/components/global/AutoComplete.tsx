'use client';

/** Component usage example: 
  <AutoComplete
    placeholder="Name"
    onChange={(val) => setState(val)}
    value={newValue}
    items={[{name: "John Doe"}]}
  />
**/
import { ReactElement, memo, useEffect, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { 
  fieldBgColor, 
  primaryTextColor, 
} from "@/utils/themeColors";

interface Props {
  value: string | number;
  type?: string;
  startIcon?: ReactElement | SVGAElement;
  items: Array<any>;
  placeholder?: string;
  onChange: (value: any) => void;
  required?: boolean;
};

function AutoComplete({
  value,
  type = "text",
  items,
  startIcon,
  placeholder = "",
  onChange,
  required = false
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);
  const [inputValue, setInputValue] = useState<string | Array<any>>(value);
  const [key, setKey] = useState<number>(0); // Add key state

  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });

  useEffect(() => {
    if(items) {
      setFilteredItems(items);
    }
  }, [items]);

  useEffect(() => {
    // filter dropdown items based on input value
    const newItems = items.filter((item) => {
      return item.name
      // if(item.name.includes(inputValue)) {
      //   return item.name
      // }
    });
    setFilteredItems(newItems);
    setInputValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
    setKey(prevKey => prevKey + 1); // Update key whenever value changes
  }, [value]);

  // used to assign default value to input whenever the dropdown is toggled
  useEffect(() => {
    setInputValue(value);
  }, [openDropdown]);

  // check if the valued type exists in the list. if it doesn't, empty the input

  const handleOpenDropdown = () => {
    if(!openDropdown) {
      setOpenDropdown(true)
    }
  };

  const DropdownList = () => {
    const handleClickDropdownItem = (item: any) => {
      onChange(item);
      setInputValue(item?.name);
      setOpenDropdown(false);
    };

    return (
      <ul 
        ref={ref}
        className="z-[100] dark:bg-darkTheme-950 bg-white dark:border-neutral-800 border border-solid absolute mt-1 max-h-[200px] w-[400px] overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
        aria-labelledby="headlessui-combobox-button-:R4q:" 
        role="listbox" 
        id="headlessui-combobox-options-:rl:" 
        data-headlessui-state="open"
      >
        {filteredItems.length ? (
          <>
            {filteredItems?.map((item: any, index: number) => (
              <li
                key={index}
                onClick={() => handleClickDropdownItem(item)}
                className="relative dark:hover:bg-darkTheme-900 hover:bg-gray-100 cursor-pointer select-none py-2 px-4" id="headlessui-combobox-option-:rm:" role="option" tabIndex="-1" ariaSelected="false" data-headlessui-state=""
              >
                <span className="dark:text-neutral-50 text-darkTheme-900 block truncate font-normal">
                  {item.name}
                </span>
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
  }

  return (
    <div className={`autocomplete-field overflow-hidden bg-transparent`} key={key}>
      <div
        className={`relative w-full overflow-hidden cursor-default overflow-hidden bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}
      >
        <input
          onClick={() => handleOpenDropdown()}
          onChange={(e: any) => setInputValue(e.target.value)}
          placeholder={placeholder}
          type={type}
          required={required}
          value={inputValue?.name}
          className={`
            ${startIcon && 'pl-8'}
            ${fieldBgColor}
            ${primaryTextColor}
            border h-[45px] z-[10] relative text-sm rounded-lg focus:gray-300 focus:gray-300 block w-full p-2.5 placeholder-gray-400`} 
          role="combobox"
          type="text"
          aria-expanded="false"
        />
        {(!inputValue) ? (
          <button className="absolute inset-y-0 right-0 flex items-center pr-2 z-[15]">
            <svg t="1685348688578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6196" width="17" height="17"><path d="M192.161209 399.798489c1.289673 9.027708 5.15869 16.765743 11.607053 23.214105l282.438287 282.438288c16.765743 16.765743 42.559194 16.765743 59.324937 0l282.438287-282.438288c6.448363-6.448363 10.31738-14.186398 11.607053-23.214105H192.161209z" fill="#B0B9BE" p-id="6197"></path></svg>
          </button>
        ) : (
          <button
            onClick={() => {
              onChange("");
              setInputValue("");
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-2 z-[15]"
          >
            <svg t="1685350462942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7219" width="17" height="17"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="#B0B9BE" p-id="7220"></path></svg>
          </button>
        )}
      </div>
      {openDropdown && <DropdownList />}
    </div>
  );
}

export default memo(AutoComplete);