import * as React from 'react';

export default function Steps() {
  return (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      <li className="flex items-center text-blue-600 dark:text-[#21C79F] space-x-2.5">
        <span className="flex items-center justify-center w-8 h-8 border border-[#21C79F] rounded-full shrink-0 dark:border-[#21C79F]">
          1
        </span>
        <span>
          <h3 className="font-medium leading-tight">Select Order Options</h3>
        </span>
      </li>
      <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          2
        </span>
        <span>
          <h3 className="font-medium leading-tight">Payment and Review</h3>
        </span>
      </li>
      <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
        <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          3
        </span>
        <span>
          <h3 className="font-medium leading-tight">Review and Place Order</h3>
        </span>
      </li>
    </ol>
  );
}